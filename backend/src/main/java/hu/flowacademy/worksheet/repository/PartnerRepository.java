package hu.flowacademy.worksheet.repository;

import hu.flowacademy.worksheet.entity.Partner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PartnerRepository extends JpaRepository<Partner, String>, JpaSpecificationExecutor<Partner> {
    public Optional<Partner> findFirstByNev(String nev);
}
