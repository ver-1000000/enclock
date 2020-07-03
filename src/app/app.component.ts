import { ChangeDetectionStrategy, Component } from '@angular/core';

class Plan {
  content = '';
  strokeDashoffset = 0;
  strokeDasharray = 100;
  stroke = '';

  constructor(opt: Partial<Plan> = {}) {
    opt.stroke = opt.stroke || this.stroke || randomColor();
    Object.assign(this, opt);
  }
}

const randomColor = (h = Math.round(Math.random() * 360)) => `hsl(${h}, ${90}%, ${70}%)`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title                     = 'enclock';
  percentage                = 70;
  plans: Plan[]             = [new Plan({ content: 'プラン１' })];
  selectedPlan: null | Plan = null;

  add(): void {
    this.plans.push(new Plan());
  }

  division(plan: Plan): void {
    const strokeDasharray = plan.strokeDasharray / 2;
    const stroke = randomColor(this.plans.length * 30);
    const strokeDashoffset = plan.strokeDashoffset - strokeDasharray;
    plan.strokeDasharray = strokeDasharray;
    this.plans.push(new Plan({ strokeDasharray, strokeDashoffset, stroke }));
  }
}
