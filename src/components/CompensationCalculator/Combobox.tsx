import React from 'react'
import { Combobox as HeadlessCombobox, Transition } from '@headlessui/react'
import { SelectorIcon, CheckIcon } from '@heroicons/react/outline'
import { classNames } from 'lib/utils'

type ComboboxProps = {
    label: string
    placeholder?: string
    options: any[]
    value: any | undefined
    onChange: (option: any | undefined) => void
    display?: (option: any) => string
}

export const Combobox = (props: ComboboxProps) => {
    const [query, setQuery] = React.useState<string>('')

    const filteredOptions =
        query === ''
            ? props.options
            : props.options.filter((option) =>
                  option.toLowerCase().replace(/\s+/g, '').includes(query.replace(/\s+/g, '').toLowerCase())
              )

    const currentValue = props.display ? props.display(props.value) : props.value

    return (
        <HeadlessCombobox
            as="div"
            className="relative focus:outline-none"
            value={props.value}
            onChange={(value) => {
                props.onChange(value)
                setQuery('')
            }}
            nullable
        >
            {({ open }) => (
                <>
                    <HeadlessCombobox.Label className="text-sm">{props.label}</HeadlessCombobox.Label>
                    <HeadlessCombobox.Button
                        as="div"
                        className="block flex items-center relative w-full max-w-md focus:outline-none shadow-sm mt-1.5"
                    >
                        <HeadlessCombobox.Input
                            onFocus={(event: React.FocusEvent<HTMLInputElement>) => (event.target.value = '')}
                            onClick={(event: React.MouseEvent<HTMLInputElement>) =>
                                ((event.target as HTMLInputElement).value = '')
                            }
                            onChange={(event) => setQuery(event.target.value)}
                            displayValue={props.display}
                            placeholder={currentValue || props.placeholder || 'Select a value'}
                            className={`relative block w-full text-left bg-white px-2.5 py-1.5 rounded border border-black/10 text-xs select-none focus-visible:outline-none focus:ring-1 focus:ring-orange focus:border-orange placeholder:text-gray-600`}
                        />

                        <span className="ml-3 absolute right-0 pr-2 pointer-events-none">
                            <SelectorIcon className="h-4 w-4 text-gray-accent-light" aria-hidden="true" />
                        </span>
                    </HeadlessCombobox.Button>

                    <Transition
                        show={open}
                        as={React.Fragment}
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <HeadlessCombobox.Options className="absolute top-full mt-1 w-full max-w-lg bg-white rounded p-0 z-50 text-xs max-h-[12rem] overflow-y-scroll py-1 focus:outline-none space-y-1 shadow-xl border border-black/10">
                            {filteredOptions.length === 0 && query !== '' ? (
                                <div className="px-2.5 py-1 text-xs text-gray">No results</div>
                            ) : (
                                filteredOptions.map((option) => (
                                    <HeadlessCombobox.Option
                                        value={option}
                                        key={option}
                                        className={({ active }) => `
                                            list-none px-2.5 cursor-pointer focus:outline-none text-xs py-1
                                            ${active ? 'bg-orange text-white' : ''}
                                        `}
                                    >
                                        {({ selected, active }) => (
                                            <div className="flex justify-between items-center">
                                                <span
                                                    className={classNames(
                                                        selected ? 'font-semibold' : 'font-normal',
                                                        'ml-1 block truncate text-xs'
                                                    )}
                                                >
                                                    {props.display ? props.display(option) : option}
                                                </span>

                                                {selected && (
                                                    <span
                                                        className={classNames(
                                                            'flex items-center',
                                                            active ? 'text-white' : 'text-orange'
                                                        )}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </HeadlessCombobox.Option>
                                ))
                            )}
                        </HeadlessCombobox.Options>
                    </Transition>
                </>
            )}
        </HeadlessCombobox>
    )
}

export default Combobox
