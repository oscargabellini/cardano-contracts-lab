/**
 * Generic interface for mutation callbacks that can be used across the application.
 * Provides type-safe callbacks for mutation lifecycle events.
 */
export interface MutationCallbacks<TVariables, TData = void> {
  /**
   * Called when the mutation succeeds.
   * @param data - The data returned by the mutation
   * @param variables - The variables that were passed to the mutation
   */
  onSuccess?: (data: TData, variables: TVariables) => void;

  /**
   * Called when the mutation fails.
   * @param error - The error that occurred
   */
  onError?: (error: Error) => void;

  /**
   * Called when the mutation occurs (useful for optimistic updates).
   *
   * @param variables - The variables that were passed to the mutation
   */
  onMutate?: (variables: TVariables) => void;
}
