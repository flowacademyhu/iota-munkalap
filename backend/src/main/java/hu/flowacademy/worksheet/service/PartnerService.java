package hu.flowacademy.worksheet.service;

import hu.flowacademy.worksheet.entity.Partner;
import hu.flowacademy.worksheet.entity.User;
import hu.flowacademy.worksheet.entity.Worksheet;
import hu.flowacademy.worksheet.enumCustom.OrderType;
import hu.flowacademy.worksheet.enumCustom.Status;
import hu.flowacademy.worksheet.enumCustom.WorksheetStatus;
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

    private final PartnerRepository partnerRepository;
    private final KeycloakClientService keycloakClientService;


    public Partner createPartner(@NonNull Partner partner) throws ValidationException {
        validatePartner(partner);
        partner.setMegrendeloTipusa(OrderType.LEGAL);
        return partnerRepository.save(partner);
    }

    private void validatePartner(Partner partner) throws ValidationException {
        nullChecker(partner);
        emailChecker(partner);
        taxNumberChecker(partner);
        bankAccountChecker(partner);
    }

    private void nullChecker(Partner partner) throws ValidationException {
        if (partner.getPartnerEmail() == null) {
            throw new ValidationException("Partner email is null");
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
        if (partner.getBankszamlaszam() == null) {
            throw new ValidationException("The bank account number is null");
        }
        if (partner.getSzamlazasiCimOrszagKod() == null) {
            throw new ValidationException("The country code is null");
        }
        if (partner.getSzamlazasiCimOrszagNev() == null) {
            throw new ValidationException("The country name is null");
        }
        if (partner.getSzamlazasiCimMegyeNev() == null) {
            throw new ValidationException("The county name is null");
        }
        if (partner.getSzamlazasiCimIranyitoszam() == null) {
            throw new ValidationException("The postcode is null");
        }
        if (partner.getSzamlazasiCimTelepulesNev() == null) {
            throw new ValidationException("The city name is null");
        }
        if (partner.getSzamlazasiCimKozteruletNev() == null) {
            throw new ValidationException("The street name is null");
        }
        if (partner.getSzamlazasiCimKozteruletJellegNev() == null) {
            throw new ValidationException("The street type is null");
        }
        if (partner.getSzamlazasiCimHazszam() == null) {
            throw new ValidationException("The house number is null");
        }
    }

    private void emailChecker(Partner partner) throws ValidationException {
        if (!EmailValidator.getInstance().isValid(partner.getPartnerEmail())) {
            throw new ValidationException("Invalid partner email format");
        }
    }

    private void taxNumberChecker(Partner partner) throws ValidationException {
        if (partner.getAdoszam().length() != 8) {
            throw new ValidationException("The tax number length is not eight");
        }
        for (char x : partner.getAdoszam().toCharArray()) {
            if (!Character.isDigit(x)) {
                throw new ValidationException("The tax number is not a digit");
            }
        }
        if (partner.getKAdoszamtipus() < 1 || partner.getKAdoszamtipus() > 5) {
            throw new ValidationException("The K. tax number is not 1, 2, 3, 4, 5");
        }
    }

    private void bankAccountChecker(Partner partner) throws ValidationException {
        if (!(partner.getBankszamlaszam().length() == 17 || partner.getBankszamlaszam().length() == 26)) {
            throw new ValidationException("The bank account number length is not appropriate");
        }
        for (int i = 0; i < partner.getBankszamlaszam().length(); i++) {
            if (i == 8 || i == 17) {
                if (partner.getBankszamlaszam().charAt(i) != '-') {
                    throw new ValidationException("The bank account format is not valid, missing: - ");
                }
            } else if (!Character.isDigit(partner.getBankszamlaszam().charAt(i))) {
                throw new ValidationException("The bank account format is not valid, missing numbers");
            }
        }
    }

    public Partner setStatusPartner(String id, boolean status) throws ValidationException {
        partnerRepository.updatePartnerstatus(id, status);
        return partnerRepository.findById(id).orElseThrow(() -> new ValidationException("No partner with the given id " + id));
    }

}
