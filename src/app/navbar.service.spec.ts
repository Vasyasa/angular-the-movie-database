import { NavbarService } from './navbar.service';

import { of } from 'rxjs';


describe('NavbarService', () => {
    let service: NavbarService;
    let httpClientSpy: { get: jasmine.Spy };

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        service = new NavbarService(httpClientSpy as any);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('getResultSearch should return value from request',
        (done: DoneFn) => {
            const expectResult: [{}] = [{
                id: 1,
                poster_path: "123"
            }];

            const mockData = {
                results: expectResult
            };

            httpClientSpy.get.and.returnValue(of(mockData));
            service.getResultSearch("film").subscribe(results => {
                expect(results).toEqual(expectResult, 'expected films');
                done();
            },
                done.fail
            );
        });

});
