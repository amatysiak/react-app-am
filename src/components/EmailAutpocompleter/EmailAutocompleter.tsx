import React, { useState } from "react";
import classNames from "classnames";
import { Scrollbars } from "react-custom-scrollbars";
import { SelectedItemsInterface } from "./EmailAutocompleter.interface";
import "./EmailAutocompleter.scss";

interface Props {
    suggestions: string[];
}

const EmailAutocompleter = (props: Props) => {
    const [activeInputValue, setActiveInputValue] = useState<string>("");
    const [suggestionsfilteredList, setSuggestionsfilteredList] = useState<string[]>([]);
    const [isSuggestionsListVisible, setIsSuggestionsListVisible] = useState<boolean>(false);
    const [selectedItems, setSelectedItems] = useState<any>([]);

    const onChangeInputHandler = (e: React.FormEvent<HTMLInputElement>) => {
        const currentValue = e.currentTarget.value;
        setActiveInputValue(currentValue);

        if (currentValue === "") return;

        const reg = new RegExp(currentValue.toLowerCase());

        const filteredList = props.suggestions.filter(
            (suggestion: string)  => suggestion.match(reg) && !isSuggestionSelected(suggestion)
        );

        setSuggestionsfilteredList((filteredList));
        setIsSuggestionsListVisible(true);
    }

    const onKeyDownInputHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.keyCode === 13 || e.keyCode === 9) { // enter or tab
            activeInputValue && addSelectedItem(activeInputValue);
            setActiveInputValue("");
        }
    }

    const onClickListHandler = (selectedValue: string) => {
        addSelectedItem(selectedValue);
        setIsSuggestionsListVisible(false);
        setActiveInputValue("");
    }

    const addSelectedItem = (value: string) => {
        let copySelectedItems: [SelectedItemsInterface] = selectedItems;

        copySelectedItems.push({
            email: value,
            isValid: isEmailValid(value),
        });
        
        setSelectedItems(copySelectedItems);
    }

    const removeSelectedItem = (value: string) => {
        const newSelectedItems: [SelectedItemsInterface] = selectedItems.filter((item: SelectedItemsInterface) => item.email !== value);
        setSelectedItems(newSelectedItems);
    }

    const isEmailValid = (email: string) => {
        const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return regEmail.test(email);
    }

    const isSuggestionSelected = (suggestion: string) => {
        return selectedItems.some((item: SelectedItemsInterface) => item.email === suggestion)
    }

    const SuggestionsListComponent = () => {
        return (
            <div
                className={"autocomplete-field__suggestions"}
            >
                <Scrollbars
                    autoHeight
                    autoHeightMin={0}
                    autoHeightMax={240}
                >
                    <ul className={"autocomplete-field__suggestions-list"}>
                        {suggestionsfilteredList.length > 0 ? (
                            suggestionsfilteredList.map((position: string, index: number) => {
                                return (
                                    <li
                                        className={"autocomplete-field__suggestion"}
                                        key={index}
                                        onClick={() => onClickListHandler(position)}
                                    >
                                        {position}
                                    </li>
                                )
                            })
                        ) : (
                            <li className={"autocomplete-field__suggestion autocomplete-field__suggestion--no-results"}>No results</li>
                        )}
                    </ul>
                </Scrollbars>
            </div>
        )
    }

    return (
        <section className={"autocomplete-field"}>
            {selectedItems.length > 0 && (
                selectedItems.map((item: SelectedItemsInterface, index: number) => {
                    return (
                        <div className={classNames(`autocomplete-field__selected-value`, {
                            "autocomplete-field__selected-value--error": !item.isValid,
                        })}>
                            {item.email}
                            <i
                                className={classNames(`autocomplete-field__icon`, {
                                "autocomplete-field__icon--icon-close": item.isValid,
                                "autocomplete-field__icon--icon-error-circle": !item.isValid,
                                })}
                                key={index}
                                onClick={() => removeSelectedItem(item.email)}
                            ></i>
                        </div>
                    )
                })
            )}

            <div className={"autocomplete-field__suggestions-area"}>
                <input
                    className={"autocomplete-field__input"}
                    type={"text"}
                    placeholder={"Enter recipients"}
                    onChange={onChangeInputHandler}
                    onKeyDown={onKeyDownInputHandler}
                    value={activeInputValue}
                />

                {activeInputValue && isSuggestionsListVisible && <SuggestionsListComponent/>}
            </div>
        </section>
    )
}

export default EmailAutocompleter;