import { Component, OnInit } from '@angular/core';
import {Employee} from "../core-module/models/employee";
import {MainService} from "../core-module/services/main.service";

import {FormControl} from "@angular/forms";
import * as _moment from "moment";
import {Moment} from "moment";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDatepicker} from "@angular/material";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from "@angular/material-moment-adapter";
const moment =  _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.less'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class StartComponent implements OnInit {
  employees: Employee[];
  workersresults: any[] = [{
    "name": "IT",
    "value": 2
  },
    {
      "name": "Księgowość",
      "value": 4
    },
    {
      "name": "Ochrona",
      "value": 3
    },
    {
      "name": "Produkcja",
      "value": 8
    },
    {
      "name": "Administracja",
      "value": 3
    }];

  single: any[] = [  {
    "name": "Podstawowe",
    "value": 1
  },
    {
      "name": "Gimnazjalne",
      "value": 2
    },
    {
      "name": "Średnie",
      "value": 13
    },
    {
      "name": "Wyższe",
      "value": 31
    },
    {
      "name": "Zawodowe",
      "value": 44
    }];
  multi: any[] = [  {
    "name": "Germany",
    "series": [
      {
        "name": "01/2019",
        "value": 6.1
      },
      {
        "name": "02/2019",
        "value": 6.4
      },
      {
        "name": "03/2019",
        "value": 5.9
      },
      {
        "name": "04/2019",
        "value": 5.2
      },
      {
        "name": "05/2019",
        "value": 6.5
      },
      {
        "name": "06/2019",
        "value": 6.7
      },
      {
        "name": "07/2019",
        "value": 11.2
      }, {
        "name": "08/2019",
        "value": 14.3
      }, {
        "name": "09/2019",
        "value": 10.5
      }, {
        "name": "10/2019",
        "value": 3.2
      }, {
        "name": "11/2019",
        "value": 2.5
      }, {
        "name": "12/2019",
        "value": 5.6
      }, {
        "name": "01/2020",
        "value": 6.2
      },
    ]
  }];
  multis: any[] = [
    {
      "name": "Germany",
      "series": [
        {
          "name": "01/2019",
          "value": 6.1
        },
        {
          "name": "02/2019",
          "value": 6.4
        },
        {
          "name": "03/2019",
          "value": 5.9
        },
        {
          "name": "04/2019",
          "value": 5.2
        },
        {
          "name": "05/2019",
          "value": 6.5
        },
        {
          "name": "06/2019",
          "value": 6.7
        },
        {
          "name": "07/2019",
          "value": 11.2
        }, {
          "name": "08/2019",
          "value": 14.3
        }, {
          "name": "09/2019",
          "value": 10.5
        }, {
          "name": "10/2019",
          "value": 3.2
        }, {
          "name": "11/2019",
          "value": 2.5
        }, {
          "name": "12/2019",
          "value": 5.6
        }, {
          "name": "01/2020",
          "value": 6.2
        }]}
  ];
  horizontal: any[] = [  {
    "name": "IT",
    "value": 6
  },
    {
      "name": "Księgowość",
      "value": 5
    },
    {
      "name": "Administracja",
      "value": 5
    },
    {
      "name": "Ochrona",
      "value": 10
    },
    {
      "name": "Produkcja",
      "value": 14
    }];
  months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Pażdziernik', 'Listopad', 'Grudzień'];
  workersview: any[];
  educationview: any[] = [550, 200];
  gradient: boolean = false;
  table_year = 2020;
  table_month = 0;
  workerscolors = {
    domain: ['#111111', '#2DBB54']
  };

  // options
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Data';
  showYAxisLabel = true;
  yAxisLabel = 'Liczba Dni';
  timeline: boolean = false;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showLegend: boolean = true;
  date = new FormControl(moment());
  maxDate =  moment();
  minDate = new Date(2019, 0, 1);



  constructor(private mainservice: MainService) { }

  ngOnInit() {
    this.mainservice.getEmployees().subscribe((emps)=> {
      this.employees = emps;
    });
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);

  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.table_year = ctrlValue.year();
    this.table_month = ctrlValue.month();
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

}
