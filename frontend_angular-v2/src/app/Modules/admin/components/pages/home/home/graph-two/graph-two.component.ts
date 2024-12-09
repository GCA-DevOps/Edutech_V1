import { Component, OnInit } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { HttpClient } from '@angular/common/http';
import { HomecardsService } from '../homecards.service';

@Component({
  selector: 'app-graph-two',
  templateUrl: './graph-two.component.html',
  styleUrls: ['./graph-two.component.css'],
})
export class GraphTwoComponent implements OnInit {
  totalIncome: number = 0;
  totalExpense: number = 0;
  totalProfit: number = 0;
  transactions: any[] = [];
  isLoading: boolean = true;
  chart: ApexCharts | undefined;

  options: any = {
    series: [
      { name: 'Income', color: '#31C48D', data: [] },
      { name: 'Expense', color: '#F05252', data: [] },
    ],
    chart: { type: 'bar', height: 230 },
    xaxis: { categories: [] },
  };

  constructor(
    private http: HttpClient,
    private homecardsService: HomecardsService
  ) {}

  ngOnInit(): void {
    this.fetchChartData();
    this.generateNextSixMonths();
  }

  fetchChartData(): void {
    this.homecardsService.getTotalIncome().subscribe(
      (data: any) => {
        if (data && data['entity'] && Array.isArray(data['entity'])) {
          this.transactions = data['entity'];
          this.options.series[0].data = this.transactions.map(
            (transaction) => transaction.debit || 0
          );
          this.calculateTotalIncome();
          this.renderChart();
        } else {
          console.error('Invalid API response format for Total Incomes.');
        }
      },
      (error: any) => console.error('Error fetching total incomes:', error)
    );

    this.homecardsService.getTotalExpenses().subscribe(
      (expenseData: any) => {
        if (expenseData && expenseData['total_expenses'] !== undefined) {
          const expenseSeries = Array.isArray(expenseData['total_expenses'])
            ? expenseData['total_expenses']
            : [expenseData['total_expenses']];
          this.options.series[1].data = expenseSeries;
          this.totalExpense = expenseSeries.reduce(
            (sum, value) => sum + value,
            0
          );
          this.calculateProfit();
          this.renderChart();
        } else {
          console.error('Invalid API response format for Total Expenses.');
        }
      },
      (error: any) => console.error('Error fetching total expenses:', error)
    );
  }

  calculateTotalIncome(): void {
    this.totalIncome = this.transactions.reduce(
      (sum, transaction) => sum + (transaction.debit || 0),
      0
    );
    this.calculateProfit();
  }

  calculateProfit(): void {
    this.totalProfit = this.totalIncome - this.totalExpense;
  }

  generateNextSixMonths(): void {
    const months: string[] = [];
    const currentDate = new Date();

    for (let i = 0; i < 12; i++) {
      months.push(currentDate.toLocaleString('default', { month: 'short' }));
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    this.options.xaxis.categories = months;
  }

  renderChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new ApexCharts(
      document.getElementById('bar-chart'),
      this.options
    );
    this.chart.render();
    console.log('Income data', this.options.series[0].data);
  }
}
