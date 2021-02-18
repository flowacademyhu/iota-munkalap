package hu.flowacademy.worksheet.controller;

import hu.flowacademy.worksheet.dto.WorksheetDTO;
import hu.flowacademy.worksheet.entity.Worksheet;
import hu.flowacademy.worksheet.enumCustom.WorksheetStatus;
import hu.flowacademy.worksheet.exception.ValidationException;
import hu.flowacademy.worksheet.service.WorksheetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("api")
public class WorksheetController {

    private final WorksheetService worksheetService;

    @PostMapping("/worksheets")
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
    }

    @PutMapping("/worksheets/{id}/close")
    @RolesAllowed("admin")
    @ResponseStatus(HttpStatus.CREATED)
    public Worksheet closeWorksheet(@PathVariable (value = "id") String id) throws ValidationException {
        return worksheetService.setStatusWorksheet(id, WorksheetStatus.CLOSED);
    }

    @PutMapping("/worksheets/{id}/finalize")
    @ResponseStatus(HttpStatus.CREATED)
    public Worksheet finalizeWorksheet(@PathVariable (value = "id") String id) throws ValidationException {
        return worksheetService.setStatusWorksheet(id, WorksheetStatus.REPORTED);
    }

    @GetMapping("worksheets")
    public List<Worksheet> findByTimeInterval(@RequestParam (value = "maxTime") String maxTime,
                                             @RequestParam (value = "minTime") String minTime) {
        return worksheetService.findByTimeInterval(maxTime, minTime);
    }
}
