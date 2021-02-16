package hu.flowacademy.worksheet.service;

import hu.flowacademy.worksheet.repository.WorksheetRepository;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class WorksheetServiceTest {

    @Mock
    private WorksheetRepository worksheetRepository;

    @InjectMocks
    private WorksheetService worksheetService;


}