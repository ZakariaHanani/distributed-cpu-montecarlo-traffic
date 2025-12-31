package com.trafficjam1.authservice.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByUsernameAndIdNot(String username, Long id);
    boolean existsByEmailAndIdNot(String email, Long id);
    boolean existsByRole(Role role);
    long countByRole(Role role);
    List<User> findAllByRole(Role role);
    List<User> findByRoleIsNull();

    @Modifying
    @Transactional
    @Query("""
            update User u
            set u.lastActivityAt = :now
            where u.username = :username
              and (u.lastActivityAt is null or u.lastActivityAt < :threshold)
            """)
    int touchLastActivity(
            @Param("username") String username,
            @Param("now") Instant now,
            @Param("threshold") Instant threshold
    );
}
