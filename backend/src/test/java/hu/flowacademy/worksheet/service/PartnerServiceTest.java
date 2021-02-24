package hu.flowacademy.worksheet.service;

import hu.flowacademy.worksheet.exception.ValidationException;
import hu.flowacademy.worksheet.repository.PartnerRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class PartnerServiceTest {

    @Mock
    private PartnerRepository partnerRepository;

    @InjectMocks
    private PartnerService partnerService;

    @Test
    public void givenNewPartner_whenSavingPartner_thenGreatSuccess() throws ValidationException {

    }

}