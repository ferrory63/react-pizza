import React, { useCallback, useRef, useState } from 'react'
import debounce from 'lodash.debounce'
import { useDispatch } from 'react-redux'

import styles from './search.module.scss'
import closeSvg from '../../assets/img/close.svg'
import { setSearchValue } from '../../redux/slices/filter/slice'

export const Search = () => {
    const dispatch = useDispatch()
    const [value, setValue] = useState('')
    const ref = useRef<HTMLInputElement>(null)

    const onClickClear = () => {
        dispatch(setSearchValue(''))
        setValue('')
        if (ref.current) {
            ref.current.focus()
        }
    }

    const updateSearchValue = useCallback(
        debounce((str: string) => {
            dispatch(setSearchValue(str))
        }, 1000),
        []
    )

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
        updateSearchValue(event.target.value)
    }

    // const onChangeInput = (event) => {
    //     testDebounce(event)
    // }

    return (
        <div className={styles.root}>
            <svg
                className={styles.icon}
                enableBackground="new 0 0 32 32"
                id="EditableLine"
                version="1.1"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    cx="14"
                    cy="14"
                    fill="none"
                    id="XMLID_42_"
                    r="9"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                ></circle>
                <line
                    fill="none"
                    id="XMLID_44_"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                    x1="27"
                    x2="20.366"
                    y1="27"
                    y2="20.366"
                ></line>
            </svg>

            <input
                ref={ref}
                className={styles.input}
                value={value}
                onChange={(event) => onChangeInput(event)}
                placeholder="Поиск пиццы.."
            />
            {value && (
                <img
                    onClick={onClickClear}
                    className={styles.clearIcon}
                    alt="close"
                    src={closeSvg}
                />
            )}
        </div>
    )
}
