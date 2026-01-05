"use client";

import { useEffect,useState } from "react";

const NAME_REGEX = /^[A-Za-z ]+$/;

export default function PlayerInput({onAdd}){
    const [value, setValue] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [error, setError] = useState("");
    const [debouncedValue, setDebouncedValue] = useState("");

    useEffect(() =>{
        const timer = setTimeout(() =>{
            setDebouncedValue(value);
        },300);

        return () => clearTimeout(timer);
    }, [value]);
    
    useEffect(() =>{
        if(!debouncedValue) {
            setIsValid(false);
            setError("Please enter a valid full name (first and last).");
            return;
        }
        if(!NAME_REGEX.test(debouncedValue)){
            setIsValid(false);
            setError("Name can only contain letters and spaces.");
            return;
        }
        const parts = debouncedValue.trim().split(/\s+/);
        if(parts.length !== 2){
            setIsValid(false);
            setError("Please enter both first and last name.");
            return;
        }

        setIsValid(true);
        setError("");
    }, [debouncedValue]);

    function onKeyDown(e){
        if(e.key === "Enter"){
            e.preventDefault();
            handleAdd();
        }
    }

    function handleAdd(){
        if(!isValid) return;
        onAdd?.(debouncedValue.trim());
        setValue("");
    }

    return(
        <div className="flex flex-col gap-4">
            <input 
            type="text"
            value={value}
            placeholder="Name and Lastname"
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            >

            </input>

            <button
            onClick={handleAdd}
            disabled={!isValid}
            style={{backgroundColor:"gray",color:"white", borderRadius:"50px"}}
            >+</button>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );

}
