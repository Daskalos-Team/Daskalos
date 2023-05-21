import usePlacesAutocomplete from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxList,
    ComboboxOption,
    ComboboxPopover
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import "../news-feed-page/search-component/SearchComponent.css";
import React from "react";

export const PlacesAutocompleteInput = ({setAddress}: any): React.JSX.Element => {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions
    } = usePlacesAutocomplete();

    const handleSelect = async (address: any) => {
        setValue(address, false);
        setAddress(address);
        clearSuggestions();
    };

    return (
        <Combobox onSelect={handleSelect}>
            <ComboboxInput
                value={value}
                onChange={(e: any) => {
                    setValue(e.target.value);
                    setAddress(e.target.value);
                }}
                disabled={!ready}
                className="combobox-input"
                placeholder="თქვენი ლოკაცია"
            />
            <ComboboxPopover className={"suggestions-combo"}>
                <ComboboxList>
                    {status === "OK" &&
                      data.map(({ place_id, description }) => (
                          <ComboboxOption key={place_id} value={description} />
                      ))}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    );
};
