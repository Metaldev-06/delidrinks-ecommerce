import { IsPrimaryPipe } from './is-primary.pipe';

describe('IsPrimaryPipe', () => {
  it('create an instance', () => {
    const pipe = new IsPrimaryPipe();
    expect(pipe).toBeTruthy();
  });
});
