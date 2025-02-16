import { getUndecoratedStateInIvyWarningMessage } from '../configs/messages.config';

/**
 * All provided or injected tokens must have `@Injectable` decorator
 * (previously, injected tokens without `@Injectable` were allowed
 * if another decorator was used, e.g. pipes).
 */
export function ensureStateClassIsInjectable(stateClass: any): void {
  // `ɵprov` is a static property added by the NGCC compiler. It always exists in
  // AOT mode because this property is added before runtime. If an application is running in
  // JIT mode then this property can be added by the `@Injectable()` decorator. The `@Injectable()`
  // decorator has to go after the `@State()` decorator, thus we prevent users from unwanted DI errors.
  const ngInjectableDef = stateClass.ɵprov;
  if (!ngInjectableDef) {
    // Don't warn if Ivy is disabled or `ɵprov` exists on the class
    console.warn(getUndecoratedStateInIvyWarningMessage(stateClass.name));
  }
}
