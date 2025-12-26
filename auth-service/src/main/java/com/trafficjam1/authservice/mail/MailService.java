package com.trafficjam1.authservice.mail;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {
    private static final Logger log = LoggerFactory.getLogger(MailService.class);

    private final JavaMailSender mailSender;
    private final boolean sendEnabled;
    private final boolean exposeCode;
    private final String host;
    private final int port;
    private final String username;
    private volatile String lastError;

    public MailService(JavaMailSender mailSender,
                       @Value("${app.mail.send.enabled:true}") boolean sendEnabled,
                       @Value("${app.mail.expose.code:false}") boolean exposeCode,
                       @Value("${spring.mail.host:smtp.gmail.com}") String host,
                       @Value("${spring.mail.port:587}") int port,
                       @Value("${spring.mail.username:}") String username) {
        this.mailSender = mailSender;
        this.sendEnabled = sendEnabled;
        this.exposeCode = exposeCode;
        this.host = host;
        this.port = port;
        this.username = username;
    }

    public boolean sendVerificationCode(String to, String code) {
        if (!sendEnabled) {
            log.debug("Mail sending disabled, pretending to send code={} to={}", code, to);
            return true;
        }
        try {
            log.debug("Sending verification code to={} via host={} port={} userPresent={}", to, host, port, !mask(username).isEmpty());
            SimpleMailMessage message = new SimpleMailMessage();
            if (username != null && !username.isEmpty()) {
                message.setFrom(username);
            }
            message.setTo(to);
            message.setSubject("Your verification code");
            message.setText("Your verification code is: " + code + "\nIt expires in 10 minutes.");
            mailSender.send(message);
            log.info("Mail sent successfully to={}", to);
            lastError = null;
            return true;
        } catch (Exception e) {
            log.error("Mail send failed to={} cause={}", to, e.getMessage(), e);
            lastError = e.getMessage();
            return false;
        }
    }

    public boolean isExposeCode() {
        return exposeCode;
    }

    public boolean isSendEnabled() {
        return sendEnabled;
    }

    public String getLastError() {
        return lastError;
    }

    private String mask(String value) {
        if (value == null || value.isEmpty()) return "";
        int keep = Math.min(2, value.length());
        return value.substring(0, keep) + "***";
    }
}
