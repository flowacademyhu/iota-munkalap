package hu.flowacademy.worksheet.service;

import hu.flowacademy.worksheet.entity.Partner;
import hu.flowacademy.worksheet.exception.ValidationException;
import hu.flowacademy.worksheet.repository.PartnerRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class PartnerService {

    private PartnerRepository partnerRepository;

    public Partner savePartner(@NonNull Partner partner) throws ValidationException {
        validatePartner(partner);
        return partnerRepository.save(partner);
    }

    private void validatePartner(Partner partner) throws ValidationException {
        if (partner.getPartnerEmail() == null) {
            throw new ValidationException("Partner email is null");
        }
        if (!EmailValidator.getInstance().isValid(partner.getPartnerEmail())) {
            throw new ValidationException("Invalid partner email format");
        }
        if (partner.getTelefon() == null) {
            throw new ValidationException("The phone number is null");
        }
        if (partner.getMegrendeloTipusa() == null) {
            throw new ValidationException("The Order Type is null");
        }
        if (partner.getNev() == null) {
            throw new ValidationException("The partner name is null");
        }
        if (partner.getRovidNev() == null) {
            throw new ValidationException("The partner short name is null");
        }
        if (partner.getAdoszam() == null) {
            throw new ValidationException("The tax number is null");
        }
        if (partner.getAdoszam().length() != 8) {
            throw new ValidationException("The tax number length is not eight");
        }
        if (partner.getAdoszam().contains("[a-zA-Z]")) {
            throw new ValidationException("The tax number contains letter or other character");
        }
        if (partner.getKAdoszamTipus() == null) {
            throw new ValidationException("The K. tax number is null");
        }
        if (partner.getKAdoszamTipus() < 1 && partner.getKAdoszamTipus() > 5) {
            throw new ValidationException("The K. tax number is not 1, 2, 3, 4, 5");
        }
        if (partner.getBankszamlaszam() == null) {
            throw new ValidationException("The bank account number is null");
        }
        if (partner.getBankszamlaszam().length() != 17 || partner.getBankszamlaszam().length() != 25) {
            throw new ValidationException("The bank account number length is not appropriate");
        }
        if (partner.getBankszamlaszam().contains("[a-zA-Z]")) {
            throw new ValidationException("The bank account contains letter");
        }
    }
}