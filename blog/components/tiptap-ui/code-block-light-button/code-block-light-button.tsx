"use client"

import React, { useCallback, useState } from "react"
import type { Editor } from '@tiptap/react';
import { FaCode, FaBars } from 'react-icons/fa';
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"
import { ChevronDownIcon } from "@/components/tiptap-icons/chevron-down-icon"
import { Card, CardBody } from "@/components/tiptap-ui-primitive/card"
import { Button, ButtonGroup, type ButtonProps } from "@/components/tiptap-ui-primitive/button"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/tiptap-ui-primitive/dropdown-menu"
import { useCodeBlock } from "./use-code-block-light"
export interface ListDropdownMenuProps extends Omit<ButtonProps, "type"> {
    editor?: Editor,
    filteredLists: { label: string }[],
    hideWhenUnavailable?: boolean,
    onToggled?: () => void
}
export const CodeBlockLightButton = ({
    editor: providedEditor,
    filteredLists = [],
    hideWhenUnavailable = false,
    onToggled
} : ListDropdownMenuProps) => {
    const [ currentCodeType, setCurrentCodeType ] = useState('')
    const { editor } = useTiptapEditor(providedEditor)
    const [isOpen, setIsOpen] = useState(false)
    const {
        isVisible,
        canToggle,
        isActive,
        handleToggle,
        label,
        shortcutKeys,
        Icon,
    } = useCodeBlock({
        editor,
        hideWhenUnavailable,
        onToggled,
    })
    const handleOpenChange = useCallback(
        (open: boolean) => {
          if (!editor || !canToggle) return
          setIsOpen(open)
        },
        [canToggle, editor]
    )
    const handlerCallback = useCallback((codeType: string) => {
        if (!editor) return
        handleToggle()
        editor.chain().focus().toggleCodeBlock({ language: codeType }).run()
    }, [editor, handleToggle])
    const handlerCodeType = (codeType: string) => {
        setCurrentCodeType(codeType)
        handlerCallback(codeType)
    }
    return (
        <DropdownMenu modal open={isOpen} onOpenChange={handleOpenChange}>
            <DropdownMenuTrigger asChild>
                <Button
                    type="button"
                    tooltip="Code Block Light"
                    data-style="ghost"
                    data-active-state={isActive ? "on" : "off"}
                    disabled={!canToggle}
                    data-disabled={!canToggle}
                    tabIndex={-1}
                    aria-label={label}
                    aria-pressed={isActive}
                >
                    <FaCode className='tiptap-button-icon'></FaCode>
                    <ChevronDownIcon className="tiptap-button-dropdown-small" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <Card>
                    <CardBody>
                        <ButtonGroup>
                            {filteredLists.map((option, index) => (
                                <DropdownMenuItem key={index} asChild>
                                    <Button
                                        className="!justify-start !items-end"
                                        data-style="ghost"
                                        data-active-state={
                                            currentCodeType === option.label ? "on" : "off"
                                        }
                                        onClick={() => handlerCodeType(option.label)}
                                    >
                                        <FaBars />
                                        <div>{option.label}</div>
                                    </Button>
                                </DropdownMenuItem>
                            ))}
                        </ButtonGroup>
                    </CardBody>
                </Card>
            </DropdownMenuContent>
            {/* 
                1.还缺少下拉菜单展示部分 
                2.菜单点击控制选中代码块逻辑
            */}
        </DropdownMenu>
    )
}