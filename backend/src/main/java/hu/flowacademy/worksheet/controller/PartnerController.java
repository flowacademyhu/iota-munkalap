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
        Partner partner
    }

}

/*  @PostMapping("/worksheets")
    @ResponseStatus(HttpStatus.CREATED)
    @RolesAllowed({"admin", "user"})
    public Worksheet createWorksheet(@RequestBody WorksheetDTO worksheetDTO) throws ValidationException {
        Worksheet worksheet = Worksheet.builder()
                .partnerId(worksheetDTO.getPartnerId())
                .typeOfWork(worksheetDTO.getTypeOfWork())
                .customTypeOfWork(worksheetDTO.getCustomTypeOfWork())
                .assetSettlement(worksheetDTO.getAssetSettlement())
                .workingTimeAccounting(worksheetDTO.getWorkingTimeAccounting())
                .numberOfEmployees(worksheetDTO.getNumberOfEmployees())
                .overheadHour(worksheetDTO.getOverheadHour())
                .deliveryKm(worksheetDTO.getDeliveryKm())
                .accountSerialNumber(worksheetDTO.getAccountSerialNumber())
                .description(worksheetDTO.getDescription())
                .usedMaterial(worksheetDTO.getUsedMaterial())
                .typeOfPayment(worksheetDTO.getTypeOfPayment())
                .createdAt(worksheetDTO.getCreatedAt())
                .workerSignature(worksheetDTO.getWorkerSignature())
                .proofOfEmployment(worksheetDTO.getProofOfEmployment())
                .worksheetStatus(worksheetDTO.getWorksheetStatus())
                .build();
        return worksheetService.saveWorksheet(worksheet);
    }*/