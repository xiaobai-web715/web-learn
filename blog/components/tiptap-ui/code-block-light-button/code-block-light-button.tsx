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
export interface ListDropdownMenuProps extends Omit<ButtonProps, "type"> {
    editor?: Editor,
    filteredLists: { label: string }[],
}
export const CodeBlockLightButton = ({
    editor: providedEditor,
    filteredLists = [],
} : ListDropdownMenuProps) => {
    const [ currentCodeType, setCurrentCodeType ] = useState('')
    const { editor } = useTiptapEditor(providedEditor)
    const handlerCallback = useCallback((codeType: string) => {
        if (!editor) return
        editor.chain().focus().toggleCodeBlock({ language: codeType }).run() // 新建代码块指定语言
    }, [editor])
    const handlerCodeType = (codeType: string) => {
        setCurrentCodeType(codeType)
        handlerCallback(codeType)
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    type="button"
                    tooltip="List"
                    data-style="ghost"
                >
                    <FaCode></FaCode>
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
                                        <FaBars className=""/>
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