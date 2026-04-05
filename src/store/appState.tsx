import React, { createContext, useContext, useReducer, type ReactNode } from 'react'
import type { AppState, Bean, GlobalSettings } from '@/types'

const generateId = () => Math.random().toString(36).substring(2, 11)

const initialSettings: GlobalSettings = {
  headerText: 'On the brew bar',
  format: 'square',
  theme: 'warm',
  backgroundType: 'default',
  backgroundImage: null,
  gradientColor: '#8B7355',
  gradientIntensity: 50,
  logo: null,
  logoPosition: 'top-left',
  logoSize: 'medium',
  exportQuality: 'maximum',
}

const initialState: AppState = {
  beans: [],
  currentStep: 1,
  settings: initialSettings,
}

type Action =
  | { type: 'ADD_BEAN'; bean: Bean }
  | { type: 'UPDATE_BEAN'; id: string; updates: Partial<Bean> }
  | { type: 'REMOVE_BEAN'; id: string }
  | { type: 'SET_STEP'; step: AppState['currentStep'] }
  | { type: 'UPDATE_SETTINGS'; updates: Partial<GlobalSettings> }
  | { type: 'RESET' }
  | { type: 'IMPORT_DATA'; data: AppState }
  | { type: 'ADD_EMPTY_BEAN' }

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_EMPTY_BEAN':
      return {
        ...state,
        beans: [
          ...state.beans,
          {
            id: generateId(),
            roaster: '',
            name: '',
            origin: '',
            varietal: '',
            roastProfile: '',
            process: '',
            tastingNotes: [],
          },
        ],
      }
    case 'UPDATE_BEAN':
      return {
        ...state,
        beans: state.beans.map(bean =>
          bean.id === action.id ? { ...bean, ...action.updates } : bean
        ),
      }
    case 'REMOVE_BEAN':
      return {
        ...state,
        beans: state.beans.filter(bean => bean.id !== action.id),
      }
    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.step,
      }
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.updates,
        },
      }
    case 'RESET':
      return initialState
    case 'IMPORT_DATA':
      return action.data
    default:
      return state
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<Action>
} | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppState() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppState must be used within AppProvider')
  }
  return context
}