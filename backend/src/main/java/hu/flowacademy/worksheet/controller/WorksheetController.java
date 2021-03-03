package hu.flowacademy.worksheet.controller;

import hu.flowacademy.worksheet.dto.WorksheetDTO;
import hu.flowacademy.worksheet.entity.Worksheet;
import hu.flowacademy.worksheet.enumCustom.WorksheetStatus;
import hu.flowacademy.worksheet.exception.ValidationException;
import hu.flowacademy.worksheet.service.WorksheetService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("api")
public class WorksheetController {

    private final WorksheetService worksheetService;

    @PostMapping("/worksheets")
    @ResponseStatus(HttpStatus.CREATED)
    @RolesAllowed({"admin", "user"})
    public Worksheet createWorksheet(@RequestBody WorksheetDTO worksheetDTO) throws ValidationException {
        return worksheetService.saveWorksheet(worksheetDTO);
    }

    @PutMapping("/worksheets/{id}/close")
    @RolesAllowed("admin")
    @ResponseStatus(HttpStatus.CREATED)
    public Worksheet closeWorksheet(@PathVariable(value = "id") String id) throws ValidationException {
        return worksheetService.setStatusWorksheet(id, WorksheetStatus.CLOSED);
    }

    @PutMapping("/worksheets/{id}/finalize")
    @RolesAllowed({"admin", "user"})
    @ResponseStatus(HttpStatus.CREATED)
    public Worksheet finalizeWorksheet(@PathVariable(value = "id") String id) throws ValidationException {
        return worksheetService.setStatusWorksheet(id, WorksheetStatus.REPORTED);
    }

    @GetMapping("/worksheets")
    @RolesAllowed({"admin", "user"})
    public List<Worksheet> getWorksheetList(@RequestParam(value = "page", required = false) Optional<Integer> page,
                                            @RequestParam(value = "limit", required = false) Optional<Integer> limit,
                                            @RequestParam(value = "order_by", required = false) Optional<String> orderBy,
                                            @DateTimeFormat(pattern = "yyyy.MM.dd") @RequestParam (value = "maxTime") Optional<LocalDate> maxTime,
                                            @DateTimeFormat(pattern = "yyyy.MM.dd") @RequestParam (value = "minTime") Optional<LocalDate> minTime,
                                            @RequestParam(value = "status", required = false) Optional<WorksheetStatus> status
    ) {
        return worksheetService.collectWorksheetByCriteria(status, page, minTime, maxTime, limit, orderBy);
    }

    @PutMapping("/worksheets/{id}")
    @RolesAllowed({"admin", "user"})
    public Worksheet updateWorksheet(@PathVariable("id") String worksheetId, @RequestBody Worksheet worksheet) throws ValidationException {
        return worksheetService.update(worksheetId, worksheet);
    }

    @GetMapping("/worksheets/{id}")
    @RolesAllowed({"admin", "user"})
    public WorksheetDTO getWorksheetById(@PathVariable("id") String worksheetId) throws ValidationException {
        return worksheetService.getWorksheetById(worksheetId);
    }
}
