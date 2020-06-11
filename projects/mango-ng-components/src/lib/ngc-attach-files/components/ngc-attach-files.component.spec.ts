import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgcAttachFilesComponent } from './ngc-attach-files.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AttachFile } from '../models/attach-file.class';

describe('PcAttachFormComponent', () => {
  let component: NgcAttachFilesComponent;
  let fixture: ComponentFixture<NgcAttachFilesComponent>;
  let spies: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [ NgcAttachFilesComponent],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgcAttachFilesComponent);
    component = fixture.componentInstance;
    component.attachInfo = {
      header: 'Elije un archivo o arrástralo aquí',
      subHeader: `Para que la carga de datos funcione correctamente respeta 
      el orden de las columnas que aparecen en la plantilla de Excel.`,
      dragOver: 'Coloca aquí tus ficheros'
    };
    fixture.detectChanges();
  });

  beforeEach(() => {
    loadSpies();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onFileSelected should works', () => {
    const oneFile = new File([''], 'sample1.txt', { type: 'text/plain' });
    const twoFile = new File([''], 'sample2.txt', { type: 'text/plain' });
    let fileList: FileList = {
      0: oneFile,
      1: twoFile,
      length: 2,
      item: (index: number) => oneFile
    };

    component.onFileSelected( {
      target: {
        files: fileList
      }
    });

    expect(component.selectedFiles[0].file).toBe(oneFile);
    expect(component.selectedFiles[1].file).toBe(twoFile);
    expect(component.selectedFiles.length).toEqual(2);
    expect(spies.component.onModelChange).toHaveBeenCalledWith(component.selectedFiles);

    const threeFile = new File([''], 'sample3.txt', { type: 'text/plain' });
    fileList = {
      0: threeFile,
      length: 1,
      item: (index: number) => threeFile
    };

    component.onFileSelected( {
      target: {
        files: fileList
      }
    });

    expect(component.selectedFiles[2].file).toBe(threeFile);
    expect(component.selectedFiles.length).toEqual(3);
    expect(spies.component.onModelChange).toHaveBeenCalledWith(component.selectedFiles);
  });

  it('onFileDropped should works', () => {

    let fileEvent: File[] = [
      {name: 'sample1.txt', lastModified: 0, size: 0, type: 'txt', slice: (): Blob => null},
      {name: 'sample2.txt', lastModified: 0, size: 0, type: 'txt', slice: (): Blob => null}
    ];

    component.onFileDropped(fileEvent);

    expect(component.selectedFiles[0].file).toBe(fileEvent[0]);
    expect(component.selectedFiles[1].file).toBe(fileEvent[1]);
    expect(component.selectedFiles.length).toEqual(2);
    expect(spies.component.onModelChange).toHaveBeenCalledWith(component.selectedFiles);

    fileEvent = [
      {name: 'sample3.txt', lastModified: 0, size: 0, type: 'txt', slice: (): Blob => null}
    ];

    component.onFileDropped(fileEvent);

    expect(component.selectedFiles[2].file).toBe(fileEvent[0]);
    expect(component.selectedFiles.length).toEqual(3);
    expect(spies.component.onModelChange).toHaveBeenCalledWith(component.selectedFiles);
  });

  it('closeFile should works', () => {
    const oneFile = new File([''], 'sample1.txt', { type: 'text/plain' });
    const oneAttachFile = new AttachFile(oneFile, false, '');
    const twoFile = new File([''], 'sample2.txt', { type: 'text/plain' });
    const twoAttachFile = new AttachFile(twoFile, false, '');

    component.selectedFiles = [ oneAttachFile, twoAttachFile ];

    component.closeFile(oneAttachFile);

    expect(component.selectedFiles.length).toEqual(1);
    expect(component.selectedFiles[0]).toBe(twoAttachFile);
    expect(component.selectedFiles[0].file).toBe(twoFile);
    expect(spies.component.onModelChange).toHaveBeenCalledWith(component.selectedFiles);
  });

  function loadSpies() {
    spies = {
      component: {
        onModelChange: spyOn(component, 'onModelChange')
    }};
  }
});
