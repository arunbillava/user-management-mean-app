import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { map } from 'rxjs/operators';
import { TokenStorage } from '../../auth/token.storage';

@Injectable()
export class MemberService {

  constructor(private http : HttpClient, private token: TokenStorage) {}

  public $userSource = new Subject<any>();

  getMembers() : Observable <any> {
    let userId=this.token.getUserId();
    return this.http.get('/api/member/?userId='+userId).pipe(map(res => res));
  }

  addMember(member:any): Observable <any> {
    let memberDetail={
      userId:this.token.getUserId(),
      ...member
    }
    return this.http.post('/api/member/', memberDetail).pipe(map(res => res));
  }

  updateMember(member:any,memberId:string): Observable <any> {
    let memberDetail={
      userId:this.token.getUserId(),
      ...member
    }
    return this.http.put('/api/member/'+memberId, memberDetail).pipe(map(res => res));
  }

  deleteMember(member:any): Observable <any> {
    return this.http.delete('/api/member/'+member._id, member).pipe(map(res => res));
  }


}
