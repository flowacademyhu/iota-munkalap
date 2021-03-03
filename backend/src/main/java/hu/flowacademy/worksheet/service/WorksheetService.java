package hu.flowacademy.worksheet.service;

import hu.flowacademy.worksheet.configuration.PagingProperties;
import hu.flowacademy.worksheet.dto.WorksheetDTO;
import hu.flowacademy.worksheet.entity.User;
import hu.flowacademy.worksheet.entity.Worksheet;
import hu.flowacademy.worksheet.enumCustom.TypeOfWork;
import hu.flowacademy.worksheet.enumCustom.WorksheetStatus;
import hu.flowacademy.worksheet.exception.ValidationException;
import hu.flowacademy.worksheet.repository.WorksheetRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static hu.flowacademy.worksheet.service.filter.WorksheetSpecification.buildSpecification;

@Service
@RequiredArgsConstructor
@Transactional
public class WorksheetService {

    private final int DEFAULT_PAGE = 0;
    private final String DEFAULT_ORDERBY = "id";

    private final WorksheetRepository worksheetRepository;
    private final PagingProperties pagingProperties;
    private final PartnerService partnerService;
    private final UserService userService;

    public WorksheetDTO saveWorksheet(@NonNull WorksheetDTO worksheetDTO) throws ValidationException {
        Worksheet worksheet = buildWorksheet(worksheetDTO);
        validateWorksheet(worksheet);
        return buildDTO(worksheetRepository.save(worksheet.toBuilder()
                .worksheetStatus(worksheet.getWorksheetStatus() != WorksheetStatus.REPORTED ? WorksheetStatus.CREATED
                        : WorksheetStatus.REPORTED)
                .createdBy(userService.getCurrentUser().orElseThrow())
                .createdAtRealTime(LocalDateTime.now())
                .build()));
    }

    private Worksheet buildWorksheet(WorksheetDTO worksheetDTO) throws ValidationException {
        return Worksheet.builder()
                .partner(
                        partnerService.getPartnerById(worksheetDTO.getPartnerId())
                )
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
                .workerSignature(worksheetDTO.getWorkerSignature().getBytes())
                .proofOfEmployment(worksheetDTO.getProofOfEmployment().getBytes())
                .worksheetStatus(worksheetDTO.getWorksheetStatus())
                .build();
    }

    private void validateWorksheet(Worksheet worksheet) throws ValidationException {
        if (worksheet.getPartner() == null) {
            throw new ValidationException("Partner value is null");
        }
        if (worksheet.getTypeOfWork() == null) {
            throw new ValidationException("Type of work value is null");
        }
        if (worksheet.getTypeOfWork() != TypeOfWork.OTHER && StringUtils.hasText(worksheet.getCustomTypeOfWork())) {
            throw new ValidationException("Type Of Work Other value is null or empty String.");
        }
        if (worksheet.getAssetSettlement() == null) {
            throw new ValidationException("Asset settlement value is null");
        }
        if (worksheet.getWorkingTimeAccounting() == null) {
            throw new ValidationException("Working Time Accounting value is null");
        }
        if (worksheet.getNumberOfEmployees() < 1) {
            throw new ValidationException("The number of employees less then 1");
        }
        if (worksheet.getOverheadHour() < 1.0) {
            throw new ValidationException("The overhead hour less then 1");
        }
        if (worksheet.getDeliveryKm() < 0) {
            throw new ValidationException("The delivery km less then 0");
        }
        if (!StringUtils.hasText(worksheet.getDescription())) {
            throw new ValidationException("Description is empty or null");
        }
        if (worksheet.getDescription().length() > 3000) {
            throw new ValidationException("Description length is more than 3000 character");
        }
        if (!StringUtils.hasText(worksheet.getUsedMaterial())) {
            throw new ValidationException("UsedMaterial is empty or null");
        }
        if (worksheet.getWorkerSignature() == null) {
            throw new ValidationException("Worker signature value is null");
        }
        if (worksheet.getProofOfEmployment() == null) {
            throw new ValidationException("Proof of Employment value is null");
        }
    }

    public Worksheet setStatusWorksheet(String id, WorksheetStatus status) throws ValidationException {
        worksheetRepository.updateWorksheetstatus(id, status);
        return worksheetRepository.findById(id).orElseThrow(() -> new ValidationException("No worksheet with the given id " + id));
    }

    public WorksheetDTO update(String id, WorksheetDTO worksheetReceivedDTO) throws ValidationException {
        Worksheet worksheetReceived = buildWorksheet(worksheetReceivedDTO);
        validateWorksheet(worksheetReceived);
        Worksheet worksheetToUpdate = worksheetRepository.findById(id).orElseThrow(() -> new ValidationException("No worksheet with the given id " + worksheetReceived.getId()));
        return buildDTO(addedWorksheet(worksheetReceived, worksheetToUpdate));
    }

    private Worksheet addedWorksheet(Worksheet worksheetReceived, Worksheet worksheetToUpdate) throws ValidationException {
        worksheetToUpdate.setPartner(partnerService.getPartnerById(worksheetReceived.getPartner().getPartnerId()));
        worksheetToUpdate.setTypeOfWork(worksheetReceived.getTypeOfWork());
        worksheetToUpdate.setCustomTypeOfWork(worksheetReceived.getCustomTypeOfWork());
        worksheetToUpdate.setAssetSettlement(worksheetReceived.getAssetSettlement());
        worksheetToUpdate.setWorkingTimeAccounting(worksheetReceived.getWorkingTimeAccounting());
        worksheetToUpdate.setNumberOfEmployees(worksheetReceived.getNumberOfEmployees());
        worksheetToUpdate.setOverheadHour(worksheetReceived.getOverheadHour());
        worksheetToUpdate.setDeliveryKm(worksheetReceived.getDeliveryKm());
        worksheetToUpdate.setAccountSerialNumber(worksheetReceived.getAccountSerialNumber());
        worksheetToUpdate.setDescription(worksheetReceived.getDescription());
        worksheetToUpdate.setUsedMaterial(worksheetReceived.getUsedMaterial());
        worksheetToUpdate.setTypeOfPayment(worksheetReceived.getTypeOfPayment());
        worksheetToUpdate.setWorkerSignature(worksheetReceived.getWorkerSignature());
        worksheetToUpdate.setProofOfEmployment(worksheetReceived.getProofOfEmployment());
        worksheetToUpdate.setCreatedAt(worksheetReceived.getCreatedAt());
        return worksheetRepository.save(worksheetToUpdate);
    }

    public List<WorksheetDTO> collectWorksheetByCriteria(Optional<WorksheetStatus> status, Optional<Integer> page, Optional<LocalDate> minTime, Optional<LocalDate> maxTime, Optional<Integer> limit, Optional<String> orderBy) {
        List <Worksheet> worksheetList = page.isEmpty() ?
                worksheetRepository.findAll(
                        buildSpecification(status, maxTime, minTime),
                        Sort.by(orderBy.orElse(DEFAULT_ORDERBY)).ascending())
                : worksheetRepository.findAll(
                buildSpecification(status, maxTime, minTime),
                PageRequest.of(page.orElse(DEFAULT_PAGE), limit.orElse(pagingProperties.getDefaultLimit()), Sort.by(orderBy.orElse(DEFAULT_ORDERBY)).ascending())
        ).getContent();
        return worksheetList.stream().map(this::buildDTO).collect(Collectors.toList());
    }

    public WorksheetDTO getWorksheetById(String worksheetId) throws ValidationException {
       return buildDTO(worksheetRepository.findById(worksheetId).orElseThrow(() -> new ValidationException("No worksheet with the given id " + worksheetId)));
    }

    private WorksheetDTO buildDTO(Worksheet worksheetReceived) {
        return WorksheetDTO.builder()
                .id(worksheetReceived.getId())
                .partnerId(worksheetReceived.getPartner().getPartnerId())
                .partnerName(worksheetReceived.getPartner().getNev())
                .typeOfWork(worksheetReceived.getTypeOfWork())
                .customTypeOfWork(worksheetReceived.getCustomTypeOfWork())
                .assetSettlement(worksheetReceived.getAssetSettlement())
                .workingTimeAccounting(worksheetReceived.getWorkingTimeAccounting())
                .numberOfEmployees(worksheetReceived.getNumberOfEmployees())
                .overheadHour(worksheetReceived.getOverheadHour())
                .deliveryKm(worksheetReceived.getDeliveryKm())
                .accountSerialNumber(worksheetReceived.getAccountSerialNumber())
                .description(worksheetReceived.getDescription())
                .usedMaterial(worksheetReceived.getUsedMaterial())
                .typeOfPayment(worksheetReceived.getTypeOfPayment())
                .createdBy(Optional.ofNullable(worksheetReceived.getCreatedBy()).map(User::getFullName).orElse(""))
                .createdAt(worksheetReceived.getCreatedAt())
                .worksheetStatus(worksheetReceived.getWorksheetStatus())
                .workerSignature(new String(worksheetReceived.getWorkerSignature()))
                .proofOfEmployment(new String(worksheetReceived.getProofOfEmployment()))
                .build();
    }
}
