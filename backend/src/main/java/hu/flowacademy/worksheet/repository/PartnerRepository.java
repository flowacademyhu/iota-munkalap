package hu.flowacademy.worksheet.repository;

import hu.flowacademy.worksheet.entity.Partner;
import hu.flowacademy.worksheet.enumCustom.WorksheetStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PartnerRepository extends JpaRepository<Partner, String>, JpaSpecificationExecutor<Partner> {

    @Modifying
    void updateEnabled(String id, Boolean status);

}
