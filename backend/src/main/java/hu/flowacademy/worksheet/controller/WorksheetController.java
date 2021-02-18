package hu.flowacademy.worksheet.controller;

import hu.flowacademy.worksheet.dto.WorksheetDTO;
import hu.flowacademy.worksheet.entity.User;
import hu.flowacademy.worksheet.entity.Worksheet;
import hu.flowacademy.worksheet.enumCustom.WorksheetStatus;
import hu.flowacademy.worksheet.exception.ValidationException;
import hu.flowacademy.worksheet.repository.UserRepository;
import hu.flowacademy.worksheet.service.UserService;
import hu.flowacademy.worksheet.service.WorksheetService;
import lombok.RequiredArgsConstructor;
import org.keycloak.KeycloakPrincipal;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("api")
public class WorksheetController {

    private final WorksheetService worksheetService;
    private final UserRepository userRepository;

    @PostMapping("/worksheets")
    @ResponseStatus(HttpStatus.CREATED)
    @RolesAllowed({"admin", "user"})
    public Worksheet createWorksheet(Authentication authentication, @RequestBody WorksheetDTO worksheetDTO) throws ValidationException {
        User creater = userRepository.findFirstByEmail(getUserEmail(authentication));
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
                .nameOfTheCreator(creater)
                .build();
        return worksheetService.saveWorksheet(worksheet);
    }

    @PutMapping("/worksheets/{id}/close")
    @RolesAllowed("admin")
    @ResponseStatus(HttpStatus.CREATED)
    public Worksheet closeWorksheet(@PathVariable(value = "id") String id) throws ValidationException {
        return worksheetService.setStatusWorksheet(id, WorksheetStatus.CLOSED);
    }

    @PutMapping("/worksheets/{id}/finalize")
    @ResponseStatus(HttpStatus.CREATED)
    public Worksheet finalizeWorksheet(@PathVariable(value = "id") String id) throws ValidationException {
        return worksheetService.setStatusWorksheet(id, WorksheetStatus.REPORTED);
    }

    @GetMapping("/worksheet")
    public List<Worksheet> getWorksheetList(@RequestParam(value = "page", required = false) Optional<Integer> page,
                                            @RequestParam(value = "limit", required = false) Optional<Integer> limit,
                                            @RequestParam(value = "order_by", required = false) Optional<String> orderBy) {
        return worksheetService.listWorksheets(page, limit, orderBy);
    }


    private String getNameFromAuthentication(Authentication authentication) {
        String firstName = ((KeycloakPrincipal) authentication.getPrincipal()).getKeycloakSecurityContext().getToken().getGivenName();
        String lastName = ((KeycloakPrincipal) authentication.getPrincipal()).getKeycloakSecurityContext().getToken().getFamilyName();
        return firstName + " " + lastName;
    }

    private String getUserEmail(Authentication authentication) {
        return ((KeycloakPrincipal) authentication.getPrincipal()).getKeycloakSecurityContext().getToken().getEmail();
    }

}
