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

    public Partner createPartner(/*@NonNull*/Partner partner) throws ValidationException {
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
        if (partner.getAdoszam().contains("[^0-9]")) {
            throw new ValidationException("The tax number contains letter or other character");
        }
     //   if (partner.getKadoszamtipus() < 1 && partner.getKadoszamtipus() > 5) {
     //       throw new ValidationException("The K. tax number is not 1, 2, 3, 4, 5");
     //   }
        if (partner.getBankszamlaszam() == null) {
            throw new ValidationException("The bank account number is null");
        }
        if (partner.getBankszamlaszam().length() != 17 || partner.getBankszamlaszam().length() != 26) {
            throw new ValidationException("The bank account number length is not appropriate");
        }
        if (partner.getBankszamlaszam().contains("[^0-9 -]")) {
            throw new ValidationException("The bank account contains letter");
        }
        if (partner.getBankszamlaszam().length() == 17) {
            for (int i = 0; i < partner.getBankszamlaszam().length(); i++) {
                if (partner.getBankszamlaszam().charAt(8) != '-') {
                    throw new ValidationException("The bank account format is not valid, missing: - ");
                }
            }
        }
        if (partner.getBankszamlaszam().length() == 26) {
            for (int i = 0; i < partner.getBankszamlaszam().length(); i++) {
                if (partner.getBankszamlaszam().charAt(8) != '-' || partner.getBankszamlaszam().charAt(17) != '-') {
                    throw new ValidationException("The bank account format is not valid, missing: - ");
                }
            }
        }
        if (partner.getBankszamlaszam().length() == 17) {
            for (int i = 0; i < partner.getBankszamlaszam().length(); i++) {
                if (partner.getBankszamlaszam().substring(0, 9).contains("-") || partner.getBankszamlaszam().substring(9, 17).contains("-")) {
                    throw new ValidationException("The bank account format is not valid, don't have 8 number");
                }
            }
        }
        if (partner.getBankszamlaszam().length() == 26) {
            for (int i = 0; i < partner.getBankszamlaszam().length(); i++) {
                if (partner.getBankszamlaszam().substring(0, 9).contains("-")
                        || partner.getBankszamlaszam().substring(9, 17).contains("-")
                        || partner.getBankszamlaszam().substring(17, 26).contains("-")) {
                    throw new ValidationException("The bank account format is not valid, don't have 8 number");
                }
            }
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
}
