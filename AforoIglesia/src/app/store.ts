import { BehaviorSubject, Observable } from 'rxjs';
import { pluck, distinctUntilChanged } from 'rxjs/operators';

import { UserProfile } from './models/user-profile';
import { Schedule } from './models/program';

export interface State {
  user: UserProfile;
  schedule_0: Schedule;
  schedule_1: Schedule;
  schedule_2: Schedule;
  schedule_3: Schedule;
  schedule_4: Schedule;
  schedule_5: Schedule;
  schedule_6: Schedule;
}

const state: State = {
  user: undefined,
  schedule_0: undefined,
  schedule_1: undefined,
  schedule_2: undefined,
  schedule_3: undefined,
  schedule_4: undefined,
  schedule_5: undefined,
  schedule_6: undefined
};

export class Store {

  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(
    distinctUntilChanged()
  );

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe( pluck(name) );
  }

  set(name: string, state_: any) {
    this.subject.next({...this.value, [name]: state_});
  }

  add(name: string, state_: any) {
    const new_add_state = this.value[name].concat(state_);
    this.subject.next({...this.value, [name]: new_add_state});
  }

}


