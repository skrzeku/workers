import { Component, OnInit } from '@angular/core';
import {Employee} from "../core-module/models/employee";
import {MainService} from "../core-module/services/main.service";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.less']
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
  view: any[] = [500, 300];
  workersview: any[];
  educationview: any[] = [550, 200];
  gradient: boolean = false;
  colorScheme = {
    domain: ['blue', '#A10A28', '#C7B42C', '#AAAAAA', 'red']
  };
  workerscolors = {
    domain: ['#001730', '#4ad7d1']
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



  constructor(private mainservice: MainService) { }

  ngOnInit() {
    this.mainservice.getEmployees().subscribe((emps)=> {
      this.employees = emps;
    });
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
