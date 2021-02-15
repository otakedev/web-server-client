import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class CaseConfirmService {
  constructor(private httpService: HttpService) {}

  async getCaseConfirmFromApi() {
    return await this.httpService
      .get('https://coronavirusapi-france.now.sh/FranceLiveGlobalData')
      .toPromise()
      .then(
        (res) => {
          const caseconfirm = res.data.FranceGlobalLiveData[0].casConfirmes;
          console.log(caseconfirm);
          return caseconfirm;
        },
        (err) => {
          console.log(err);
          return err;
        },
      );
  }
}
