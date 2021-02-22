package hu.flowacademy.worksheet.service;

import hu.flowacademy.worksheet.entity.Partner;
import hu.flowacademy.worksheet.exception.ValidationException;
import hu.flowacademy.worksheet.repository.PartnerRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class PartnerService {

    private PartnerRepository partnerRepository;

    public Partner savePartner(@NonNull Partner partner) throws ValidationException {
    return partnerRepository.save(partner);

    }
}

/*public Worksheet saveWorksheet(@NonNull Worksheet worksheet) throws ValidationException {
        validateWorksheet(worksheet);
        worksheet.setWorksheetStatus(WorksheetStatus.CREATED);
        worksheet.setCreatedAt(LocalDateTime.now());
        return worksheetRepository.save(worksheet);
    }*/
