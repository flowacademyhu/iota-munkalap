package hu.flowacademy.worksheet.controller;

import hu.flowacademy.worksheet.dto.PartnerDTO;
import hu.flowacademy.worksheet.entity.Partner;
import hu.flowacademy.worksheet.exception.ValidationException;
import hu.flowacademy.worksheet.service.PartnerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;

@RequiredArgsConstructor
@RestController
@RequestMapping("api")
public class PartnerController {

    private PartnerService partnerService;

    @PostMapping("/partners")
    @ResponseStatus(HttpStatus.CREATED)
    @RolesAllowed({"admin", "user"})
    public Partner createPartner(@RequestBody PartnerDTO partnerDTO) throws ValidationException {
        Partner partner = Partner.builder()
                .partnerEmail(partnerDTO.getPartnerEmail())
                .telefon(partnerDTO.getTelefon())
                .nev(partnerDTO.getNev())
                .megrendeloTipusa(partnerDTO.getMegrendeloTipusa())
                .rovidNev(partnerDTO.getRovidNev())
                .adoszam(partnerDTO.getAdoszam())
                .kAdoszamTipus(partnerDTO.getKAdoszamTipus())
                .bankszamlaszam(partnerDTO.getBankszamlaszam())
                .szamlazasiCimOrszagKod(partnerDTO.getSzamlazasiCimOrszagKod())
                .szamlazasiCimOrszagNev(partnerDTO.getSzamlazasiCimOrszagNev())
                .szamlazasiCimMegyeNev(partnerDTO.getSzamlazasiCimMegyeNev())
                .szamlazasiCimIranyitoszam(partnerDTO.getSzamlazasiCimIranyitoszam())
                .szamlazasiCimTelepulesNev(partnerDTO.getSzamlazasiCimTelepulesNev())
                .szamlazasiCimKerulet(partnerDTO.getSzamlazasiCimKerulet())
                .szamlazasiCimKozteruletNev(partnerDTO.getSzamlazasiCimKozteruletNev())
                .szamlazasiCimKozteruletJellegNev(partnerDTO.getSzamlazasiCimKozteruletJellegNev())
                .szamlazasiCimHazszam(partnerDTO.getSzamlazasiCimHazszam())
                .szamlazasiCimEpulet(partnerDTO.getSzamlazasiCimEpulet())
                .szamlazasiCimLepcsohaz(partnerDTO.getSzamlazasiCimLepcsohaz())
                .szamlazasiCimSzint(partnerDTO.getSzamlazasiCimSzint())
                .szamlazasiCimAjto(partnerDTO.getSzamlazasiCimAjto())
                .szamlazasiCimHrsz(partnerDTO.getSzamlazasiCimHrsz())
                .build();
        return partnerService.savePartner(partner);
    }

}
