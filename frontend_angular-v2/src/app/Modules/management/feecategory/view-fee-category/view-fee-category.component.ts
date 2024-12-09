import { Component, OnInit } from '@angular/core';
import { FeecategoryService } from '../service/feecategory.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-fee-category',
  templateUrl: './view-fee-category.component.html',
  styleUrls: ['./view-fee-category.component.css']
})
export class ViewFeeCategoryComponent implements OnInit {
  // filteredItems: any;
  loading: boolean = false;

  feeCategoryId: string | null = null;
  // term: string = ''; 
  // terms: any;
  // selectedTerm: string | null = null;
  term_items: any
  feeStructure: any;
  terms: any[]=[]
  

  // terms = [

  //   {
  //     title: 'Term 1',
  //     items: [
  //       { description: 'Introduction to concepts', amount: 1500 },
  //       { description: 'Foundation building', amount: 1800 },
  //       { description: 'Practice exercises', amount: 1200 }
  //     ]
  //   },
  //   {
  //     title: 'Term 2',
  //     items: [
  //       { description: 'Intermediate theories', amount: 2000 },
  //       { description: 'Case studies', amount: 2200 },
  //       { description: 'Group projects', amount: 2500 }
  //     ]
  //   },
  //   {
  //     title: 'Term 3',
  //     items: [
  //       { description: 'Advanced techniques', amount: 3000 },
  //       { description: 'Industry applications', amount: 3200 },
  //       { description: 'Capstone project', amount: 3500 }
  //     ]
  //   }
  // ];
  


  constructor(
    private route: ActivatedRoute,
    private feecategoryService: FeecategoryService 
  ) {}

  ngOnInit() { 
    this.route.paramMap.subscribe(params => {
      this.feeCategoryId = params.get('id');

      console.log('fhfh',this.feeCategoryId)
    });

    this.getFeeCategoryList();
  }

  getFeeCategoryList(){
    this.loading = true;
    this.feecategoryService.getFeestructureById(this.feeCategoryId).subscribe({ 
      next: (res: any) => {
        console.log("feebyId", res);
        this.loading = false;
        this.feeStructure = res.entity;
        this.terms = res.entity.terms

        console.log("terms..", this.terms);
      },
      error: (err) => {
        this.loading = false;
        console.error('Error fetching fee categories:', err);
      }
    });
  }

  // onTermChange(term: string) {
  //   console.log('Selected Term:', term);
  //   this.getFeeByTerm(this.feeCategoryId, term);
  // }

  // getFeeByTerm(feeCategoryId: any, term: any) {
  //   console.log('id', feeCategoryId)
  //   this.loading = true;
  //   this.feecategoryService.getFee(feeCategoryId, term).subscribe({ 
  //     next: (res: any) => {
  //       console.log("fee", res);
  //       this.loading = false;
  //       this.fee = res;
  //     },
  //     error: (err) => {
  //       this.loading = false;
  //       console.error('Error fetching fee categories:', err);
  //     }
  //   });
  // }


  // getTerms(): void {
  //   this.feecategoryService.getTerms().subscribe({
  //     next: (res) => {
  //       this.terms = res;
  //     },
  //     error: (err) => {
  //       console.error('Error fetching terms:', err);
  //     }
  //   });
  // }


}
