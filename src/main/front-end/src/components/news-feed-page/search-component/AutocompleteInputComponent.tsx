import usePlacesAutocomplete from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxList,
    ComboboxOption
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import "./SearchComponent.css";
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
                style={{width: "70vh"}}
                disabled={!ready}
                className="combobox-input"
                placeholder="თქვენი ლოკაცია"
            />
            {status === "OK" &&
                <div className={"suggestions-combo"}>
                    <ComboboxList>
                        {data.map(({ place_id, description }) => (
                            <ComboboxOption key={place_id} value={description} />
                        ))}
                    </ComboboxList>
                </div>
            }
        </Combobox>
    );
};
