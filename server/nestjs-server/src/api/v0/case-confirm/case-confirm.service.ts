import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class CaseConfirmService {
  // eslint-disable-next-line prettier/prettier
  constructor(private httpService: HttpService) { }

  async getCaseConfirmFromApi() {
    return await this.httpService
      .get('https://coronavirusapi-france.now.sh/FranceLiveGlobalData')
      .toPromise()
      .then(
        (res) => {
          const caseconfirm = res.data.FranceGlobalLiveData[0].hospitalises;

          return caseconfirm ?? 'indisponible';
        },
        (err) => {
          console.log(err);
          return err;
        },
      );
  }
}
