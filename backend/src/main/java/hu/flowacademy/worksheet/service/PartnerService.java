package hu.flowacademy.worksheet.service;

import hu.flowacademy.worksheet.configuration.PagingProperties;
import hu.flowacademy.worksheet.entity.Partner;
import hu.flowacademy.worksheet.enumCustom.OrderType;
import hu.flowacademy.worksheet.exception.ValidationException;
import hu.flowacademy.worksheet.repository.PartnerRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.apache.commons.validator.routines.EmailValidator;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.util.Optional;
import java.util.List;
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
    private final KeycloakClientService keycloakClientService;
    private final PagingProperties pagingProperties;
    
    public Partner createPartner(Partner partner) throws ValidationException {
        validatePartner(partner);
        orderTypeFormat(partner);
        partner.setEnabled(true);
        return partnerRepository.save(partner);
    }

    private void validatePartner(@NonNull Partner partner) throws ValidationException {
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
        if (partner.getMegrendeloTipusa().equals(OrderType.LEGAL) && !taxNumberTypeChecker(partner)) {
            throw new ValidationException("The tax number is invalid");
        }
        if (partner.getMegrendeloTipusa().equals(OrderType.LEGAL) && partner.getKAdoszamtipus() < 1
                || partner.getKAdoszamtipus() > 5) {
            throw new ValidationException("The K tax number is not valid");
        }
        if (!StringUtils.hasText(partner.getBankszamlaszam())) {
            throw new ValidationException("The bank account number is null");
        }
        if (!bankAccountFormatChecker(partner)) {
            throw new ValidationException("The bank account is not valid");
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
    }

    private boolean taxNumberTypeChecker(Partner partner) {
        return partner.getAdoszam().matches("^[0-9]{8}$");
    }

    private boolean bankAccountFormatChecker(Partner partner) {
        return partner.getBankszamlaszam().matches("^\\d{8}(-)\\d{8}$")
                || partner.getBankszamlaszam().matches("^\\d{8}(-)\\d{8}(-)\\d{8}$");
    }

    private void orderTypeFormat(Partner partner) {
        if (OrderType.PRIVATE.equals(partner.getMegrendeloTipusa())) {
            partner.setAdoszam("-");
            partner.setKAdoszamtipus(0);
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
        return page.isEmpty() ?
                partnerRepository.findAll(
                        buildSpecification(searchCriteria),
                        Sort.by(orderBy.orElse(DEFAULT_ORDERBY)).descending())
                : partnerRepository.findAll(
                buildSpecification(searchCriteria),
                PageRequest.of(page.orElse(DEFAULT_PAGE), limit.orElse(pagingProperties.getDefaultLimit()), Sort.by(orderBy.orElse(DEFAULT_ORDERBY)).descending())
        ).getContent();
    }

    private boolean filterContains(String searchPart, Partner partner) {
        return partner.getAdoszam().toLowerCase().contains(searchPart) ||
                stripAccents(partner.getNev().toLowerCase()).contains(stripAccents(searchPart));
    }

    public Partner getPartnerById(String id) throws ValidationException {
        return partnerRepository.findById(id).orElseThrow(() -> new ValidationException("No partner with the given id " + id));
    }

    public Partner togglePartnerActivity(String id) throws ValidationException {
        Partner toToggle = partnerRepository.findById(id).orElseThrow(() -> new ValidationException("No partner with provided ID"));
        toToggle.setEnabled(!toToggle.getEnabled());
        return partnerRepository.save(toToggle);
    }
}
