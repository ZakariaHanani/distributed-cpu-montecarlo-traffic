package com.grid.common;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class configLoader {
    private static final Properties PROPERTIES = new Properties();

    static {
        try (InputStream input = configLoader.class.getClassLoader().getResourceAsStream("config.properties")) {
            if (input == null) {
                throw new RuntimeException("FATAL: config/config.properties not found! Ensure it's in the resources path.");
            }
            PROPERTIES.load(input);
        } catch (IOException ex) {
            throw new RuntimeException("FATAL: Error loading configuration file: " + ex.getMessage(), ex);
        }
    }

    public static String get(String key) {
        String value = PROPERTIES.getProperty(key);
        if (value == null) {
            throw new IllegalArgumentException("Configuration key not found: " + key);
        }
        return value;
    }

    public static int getInt(String key) {
        return Integer.parseInt(get(key));
    }

    public static long getLong(String key) {
        return Long.parseLong(get(key));
    }
}