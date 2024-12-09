import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HomecardsService } from './homecards.service';

describe('HomecardsService', () => {
  let service: HomecardsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HomecardsService]
    });
    service = TestBed.inject(HomecardsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch total incomes', () => {
    const dummyIncomeData = { totalIncomes: 50000000 };

    service.getTotalIncome().subscribe(data => {
      expect(data.totalIncomes).toBe(50000000);
    });

    const incomeReq = httpMock.expectOne(service['totalIncomeUrl']);
    expect(incomeReq.request.method).toBe('GET');
    incomeReq.flush(dummyIncomeData);
  });

  it('should fetch total expenses', () => {
    const dummyExpenseData = { totalExpenses: 30000000 };

    service.getTotalExpenses().subscribe(data => {
      expect(data.totalExpenses).toBe(30000000);
    });

    const expenseReq = httpMock.expectOne(service['totalExpensesUrl']);
    expect(expenseReq.request.method).toBe('GET');
    expenseReq.flush(dummyExpenseData);
  });

  it('should fetch total supplier amount', () => {
    const dummySupplierData = { totalSupplierAmount: 20000000 };

    service.getTotalSupplierAmount().subscribe(data => {
      expect(data.totalSupplierAmount).toBe(20000000);
    });

    const supplierReq = httpMock.expectOne(service['totalSupplierAmountUrl']);
    expect(supplierReq.request.method).toBe('GET');
    supplierReq.flush(dummySupplierData);
  });

  it('should fetch total profit', () => {
    const dummyProfitData = { profit: 15000000 };

    service.getTotalProfit().subscribe(data => {
      expect(data.profit).toBe(15000000);
    });

    const profitReq = httpMock.expectOne(service['TotalProfit']);
    expect(profitReq.request.method).toBe('GET');
    profitReq.flush(dummyProfitData);
  });
});
