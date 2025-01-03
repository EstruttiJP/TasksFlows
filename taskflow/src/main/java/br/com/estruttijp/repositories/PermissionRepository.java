package br.com.estruttijp.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import br.com.estruttijp.model.Permission;

public interface PermissionRepository extends JpaRepository<Permission, Long> {
	Optional<Permission> findByDescription(@Param("description") String description);
	List<Permission> findAllByDescriptionIn(@Param("descriptions") List<String> descriptions);
}
