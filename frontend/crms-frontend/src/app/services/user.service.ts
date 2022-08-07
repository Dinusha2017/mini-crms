import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { FilterSortData } from '../models/filter-sort-data.model';
import { SalesOpportunity } from '../models/sales-opportunity.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = "http://localhost:3000/users/";

  constructor(private http: HttpClient) { }

  /** Filter, sort, and retrieve all users. */
  getFilteredSortedUsers(filterSortData: FilterSortData): Observable<any> {
    return this.http.post<any>(this.baseUrl, filterSortData);
  }

  /** Gets details of a particular user using Id. */
  getUserById(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + id);
  }

  /** Update status of a user. */
  updateUserStatus(id: string, statusObj: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + id + "/status", statusObj);
  }

  /** Add a sales opportunity of a particular user. */
  addSalesOpportunity(id: string, salesOpportunity: SalesOpportunity): Observable<any> {
    return this.http.put<any>(this.baseUrl + id + "/opportunities/", salesOpportunity);
  }

  /** Update a sales opportunity of a particular user. */
  updateSalesOpportunity(id: string, salesOpportunity: SalesOpportunity): Observable<any> {
    return this.http.put<any>(this.baseUrl + id + "/opportunities/" + salesOpportunity._id, salesOpportunity);
  }

}
