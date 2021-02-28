package hu.flowacademy.worksheet.service;

import hu.flowacademy.worksheet.entity.Partner;
import hu.flowacademy.worksheet.enumCustom.OrderType;
import hu.flowacademy.worksheet.exception.ValidationException;
import hu.flowacademy.worksheet.repository.PartnerRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.apache.commons.validator.routines.EmailValidator;
import org.aspectj.lang.annotation.RequiredTypes;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import static hu.flowacademy.worksheet.service.filter.PartnerSpecification.buildSpecification;
import static org.apache.commons.lang3.StringUtils.stripAccents;

@Service
@RequiredArgsConstructor
@Transactional
public class PartnerService {

    private final int DEFAULT_PAGE = 0;
    private final String DEFAULT_ORDERBY = "nev";

    private final PartnerRepository partnerRepository;

    public Partner createPartner(@NonNull Partner partner) throws ValidationException {
        validatePartner(partner);
//        if (partner.getMegrendeloTipusa().equals(OrderType.LEGAL)) {
//            partner.setAdoszam(partner.getAdoszam());
//            partner.setKAdoszamtipus(partner.getKAdoszamtipus());
//        } else {
//            partner.setAdoszam(null);
//            partner.setKAdoszamtipus(0);
//        }


        partner.setMegrendeloTipusa(OrderType.LEGAL);
        return partnerRepository.save(partner);
    }

    private void validatePartner(Partner partner) throws ValidationException {
        if (!StringUtils.hasText(partner.getPartnerEmail())) {
            throw new ValidationException("Partner email is null");
        } else if (!EmailValidator.getInstance().isValid(partner.getPartnerEmail())) {
            throw new ValidationException("Invalid partner email format");
        }
        if (!StringUtils.hasText(partner.getTelefon())) {
            throw new ValidationException("The phone number is null");
        }
        if (partner.getMegrendeloTipusa() == null) {
            throw new ValidationException("The Order Type is null");
        }
        if (!StringUtils.hasText(partner.getNev())) {
            throw new ValidationException("The partner name is null");
        }
        if (!StringUtils.hasText(partner.getRovidNev())) {
            throw new ValidationException("The partner short name is null");
        }
        if (partner.getMegrendeloTipusa().equals(OrderType.LEGAL) && partner.getAdoszam() == null) {
            throw new ValidationException("The tax number is null");
        }
        if (!taxNumberChecker(partner)) {
            throw new ValidationException("The tax number length is not eight");
        }
        if (!taxNumberTypeChecker(partner)) {
            throw new ValidationException("The tax number contains non digit characters");
        }
        if (partner.getMegrendeloTipusa().equals(OrderType.LEGAL) && partner.getKAdoszamtipus() < 1
                || partner.getKAdoszamtipus() > 5) {
            throw new ValidationException("The K tax number is not valid");
        }
        if (!StringUtils.hasText(partner.getBankszamlaszam())) {
            throw new ValidationException("The bank account number is null");
        }
        if (!StringUtils.hasText(partner.getSzamlazasiCimOrszagKod())) {
            throw new ValidationException("The country code is null");
        }
        if (!StringUtils.hasText(partner.getSzamlazasiCimOrszagNev())) {
            throw new ValidationException("The country name is null");
        }
        if (!StringUtils.hasText(partner.getSzamlazasiCimMegyeNev())) {
            throw new ValidationException("The county name is null");
        }
        if (!StringUtils.hasText(partner.getSzamlazasiCimIranyitoszam())) {
            throw new ValidationException("The postcode is null");
        }
        if (!StringUtils.hasText(partner.getSzamlazasiCimTelepulesNev())) {
            throw new ValidationException("The city name is null");
        }
        if (!StringUtils.hasText(partner.getSzamlazasiCimKozteruletNev())) {
            throw new ValidationException("The street name is null");
        }
        if (!StringUtils.hasText(partner.getSzamlazasiCimKozteruletJellegNev())) {
            throw new ValidationException("The street type is null");
        }
        if (!StringUtils.hasText(partner.getSzamlazasiCimHazszam())) {
            throw new ValidationException("The house number is null");
        }
        bankAccountChecker(partner);
    }

    private boolean taxNumberChecker(Partner partner) {
        boolean result = true;
        if (partner.getAdoszam().length() != 8) {
            result = false;
        }
        return result;
    }

    private boolean taxNumberTypeChecker(Partner partner) {
        boolean result = true;
        if (!partner.getAdoszam().matches("^[0-9]{8}$")) {
            result = false;
        }
        return result;
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

    public List<Partner> filter(Optional<Integer> page, Optional<String> searchCriteria, Optional<Integer> limit, Optional<String> orderBy) {
        List<Partner> result = collectPartnersByCriteria(page, searchCriteria, limit, orderBy);
        return searchCriteria.map(searchPart ->
                result.stream().filter(partner -> filterContains(searchPart.toLowerCase(), partner))
                        .collect(Collectors.toList()))
                .orElse(result);
    }

    private List<Partner> collectPartnersByCriteria(Optional<Integer> page, Optional<String> searchCriteria, Optional<Integer> limit, Optional<String> orderBy) {
        List<Partner> result = partnerRepository.findAll(
                buildSpecification(searchCriteria),
                PageRequest.of(page.orElse(DEFAULT_PAGE), limit.orElse(Integer.MAX_VALUE), Sort.by(orderBy.orElse(DEFAULT_ORDERBY)).descending())
        ).getContent();
        return result;
    }

    private boolean filterContains(String searchPart, Partner partner) {
        return partner.getAdoszam().toLowerCase().contains(searchPart) ||
                stripAccents(partner.getNev().toLowerCase()).contains(stripAccents(searchPart));
    }
}
