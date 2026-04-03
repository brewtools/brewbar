import type { Bean } from '@/types'
import { useAppState } from '@/store/appState'
import { TagInput } from '@/components/common/TagInput'
import { FileUpload } from '@/components/common/FileUpload'

interface BeanCardProps {
  bean: Bean
  index: number
  canRemove: boolean
}

function BeanCard({ bean, index, canRemove }: BeanCardProps) {
  const { dispatch } = useAppState()

  const updateBean = (updates: Partial<Bean>) => {
    dispatch({ type: 'UPDATE_BEAN', id: bean.id, updates })
  }

  return (
    <div className="bg-paper rounded-xl p-8 border border-border/30">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-fg">Bean #{index + 1}</h3>
        {canRemove && (
          <button
            type="button"
            onClick={() => dispatch({ type: 'REMOVE_BEAN', id: bean.id })}
            className="text-sm text-muted hover:text-accent transition-colors"
          >
            Remove
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-fg">
            Roaster <span className="text-accent">*</span>
          </label>
          <input
            type="text"
            value={bean.roaster}
            onChange={e => updateBean({ roaster: e.target.value })}
            maxLength={50}
            className="w-full px-4 py-3 border border-border rounded-lg bg-bg focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm text-fg placeholder:text-muted"
            placeholder="e.g., Blue Bottle"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-fg">
            Bean Name <span className="text-accent">*</span>
          </label>
          <input
            type="text"
            value={bean.name}
            onChange={e => updateBean({ name: e.target.value })}
            maxLength={50}
            className="w-full px-4 py-3 border border-border rounded-lg bg-bg focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm text-fg placeholder:text-muted"
            placeholder="e.g., Three Africas"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-fg">
            Origin <span className="text-accent">*</span>
          </label>
          <input
            type="text"
            value={bean.origin}
            onChange={e => updateBean({ origin: e.target.value })}
            maxLength={50}
            className="w-full px-4 py-3 border border-border rounded-lg bg-bg focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm text-fg placeholder:text-muted"
            placeholder="e.g., Ethiopia"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-fg">
            Varietal <span className="text-accent">*</span>
          </label>
          <input
            type="text"
            value={bean.varietal}
            onChange={e => updateBean({ varietal: e.target.value })}
            maxLength={50}
            className="w-full px-4 py-3 border border-border rounded-lg bg-bg focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm text-fg placeholder:text-muted"
            placeholder="e.g., Heirloom"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2 text-fg">
            Roast Level <span className="text-accent">*</span>
          </label>
          <input
            type="text"
            value={bean.roastProfile}
            onChange={e => updateBean({ roastProfile: e.target.value })}
            maxLength={20}
            className="w-full px-4 py-3 border border-border rounded-lg bg-bg focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm text-fg placeholder:text-muted"
            placeholder="e.g., Medium Light"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2 text-fg">Tasting Notes (up to 6)</label>
          <TagInput
            tags={bean.tastingNotes}
            onChange={tastingNotes => updateBean({ tastingNotes })}
            maxTags={6}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2 text-fg">Bag Image (Optional)</label>
          <FileUpload
            onFileSelect={bagImage => updateBean({ bagImage })}
            currentFile={bean.bagImage}
            label="Upload bag image"
          />
        </div>
      </div>
    </div>
  )
}

export function BeanEntryForm() {
  const { state, dispatch } = useAppState()

  const handleImportJSON = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const { importFromJSON } = await import('@/utils/export')
      const data = await importFromJSON(file)
      if (
        data &&
        typeof data === 'object' &&
        'beans' in data &&
        'settings' in data
      ) {
        if (confirm('This will replace your current data. Continue?')) {
          dispatch({ type: 'IMPORT_DATA', data: data as never })
        }
      } else {
        alert('Invalid JSON format')
      }
    } catch (error) {
      alert('Failed to import JSON file')
    }

    e.target.value = ''
  }

  const canProceed = state.beans.length > 0 && state.beans.every(bean =>
    bean.roaster.trim() &&
    bean.name.trim() &&
    bean.origin.trim() &&
    bean.varietal.trim() &&
    bean.roastProfile.trim()
  )

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2 text-fg">Enter Your Coffee Beans</h2>
        <p className="text-muted">Add up to 5 beans to showcase on your menu.</p>
      </div>

      {state.beans.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-border rounded-xl bg-paper">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2 text-fg">No beans added yet</h3>
          <p className="text-sm text-muted mb-6">Get started by adding your first coffee bean</p>
          <button
            type="button"
            onClick={() => dispatch({ type: 'ADD_EMPTY_BEAN' })}
            className="px-8 py-3 bg-accent text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            Add Your First Bean
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {state.beans.map((bean, index) => (
              <BeanCard
                key={bean.id}
                bean={bean}
                index={index}
                canRemove={state.beans.length > 1}
              />
            ))}
          </div>

          {state.beans.length < 5 && (
            <button
              type="button"
              onClick={() => dispatch({ type: 'ADD_EMPTY_BEAN' })}
              className="w-full py-3 border-2 border-dashed border-border rounded-lg text-muted hover:border-accent hover:text-accent transition-colors font-medium"
            >
              + Add Another Bean
            </button>
          )}
        </>
      )}

      <div className="flex items-center justify-between pt-8 border-t border-border">
        <label className="px-6 py-2.5 border border-border rounded-lg cursor-pointer hover:border-accent hover:text-accent transition-colors font-medium text-sm text-fg">
          Import JSON
          <input
            type="file"
            accept=".json"
            onChange={handleImportJSON}
            className="hidden"
          />
        </label>

        <button
          type="button"
          onClick={() => dispatch({ type: 'SET_STEP', step: 2 })}
          disabled={!canProceed}
          className="px-8 py-2.5 bg-accent text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed font-medium text-sm"
        >
          Next: Customize Settings →
        </button>
      </div>

      {!canProceed && state.beans.length > 0 && (
        <p className="text-sm text-accent text-center">
          Please fill in all required fields (marked with *) for each bean.
        </p>
      )}
    </div>
  )
}