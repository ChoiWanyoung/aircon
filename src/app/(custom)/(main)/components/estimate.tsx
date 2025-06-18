'use client'

import { useState } from 'react'
import ComponentCard from "@/components/common/ComponentCard";
import AnimatedPrice from './animatedprice'
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Alerts | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Alerts page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
  // other metadata
};


const OPTIONS_BRAND = [
  { name: '삼성', price: 100000 },
  { name: '엘지/휘센', price: 120000 },
  { name: '캐리어', price: 300000 },
  { name: '위니아/대우', price: 100000 },
  { name: '기타', price: 120000 },
]

const OPTIONS_TYPE = [
  { name: '2 in 1', price: 100000 },
  { name: '벽걸이형', price: 120000 },
  { name: '스탠드형', price: 300000 },
  { name: '천장형', price: 100000 },
]


const OPTIONS_YEARS = [
  { name: '2019년 이전', price: 100000 },
  { name: '2019년', price: 100000 },
  { name: '2020년', price: 100000 },
  { name: '2021년', price: 120000 },
  { name: '2022년', price: 300000 },
  { name: '2023년', price: 100000 },
  { name: '2024년', price: 100000 },
  { name: '2025년', price: 100000 },
]

const OPTIONS_WHAT = [
  { name: '설치', price: 100000 },
  { name: '이전설치', price: 120000 },
  { name: '해체 및 철거', price: 300000 },
  { name: '수리', price: 100000 },
  { name: '냉매가스 충전', price: 80000 },
  { name: '기타', price: 120000 },
]


const STEPS = [
  { title: '브랜드', options: OPTIONS_BRAND, type: 'radio' },
  { title: '타입', options: OPTIONS_TYPE, type: 'radio' },
  { title: '연식', options: OPTIONS_YEARS, type: 'radio' },
  { title: '수리내용', options: OPTIONS_WHAT, type: 'checkbox' },
]





export default function Estimate() {

  const [stepIndex, setStepIndex] = useState(0)

  type StepSelections = {
    [key: number]: string | Set<string> | undefined
  }

  const [selections, setSelections] = useState<StepSelections>({
    3: new Set(),
  })


  const handleRadioSelect = (step: number, name: string) => {
    setSelections((prev) => ({ ...prev, [step]: name }))
    if (step < 3) {
      setTimeout(() => setStepIndex(step + 1), 300) // 자동으로 다음 탭으로
    }
  }

  const handleCheckboxToggle = (name: string) => {
    setSelections((prev) => {
      const updated = new Set(prev[3])
      if (updated.has(name)) {
        updated.delete(name)
      } else {
        updated.add(name)
      }
      return { ...prev, 3: updated }
    })
  }

  const total =
    STEPS.slice(0, 3).reduce((sum, step, index) => {
      const selectedName = selections[index]
      const price = step.options.find((opt) => opt.name === selectedName)?.price || 0
      return sum + price
    }, 0) +
    Array.from(selections[3] || []).reduce((sum, name) => {
      const price = OPTIONS_WHAT.find((opt) => opt.name === name)?.price || 0
      return sum + price
    }, 0)

  return (
    <div>


      <div className="space-y-5 sm:space-y-6">
        <ComponentCard title="에어컨 수리 견적 보기">

          <div className="flex justify-center mb-4 space-x-2">
            {STEPS.map((step, idx) => (
              <button
                key={step.title}
                onClick={() => setStepIndex(idx)}
                className={`px-3 py-1 border-b-2 text-sm ${
                  stepIndex === idx
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-400'
                }`}
              >
                {step.title}
              </button>
            ))}
          </div>

          <div className="border rounded p-4 bg-gray-50">
            <h2 className="text-lg font-medium mb-2">{STEPS[stepIndex].title} 선택</h2>
            <div
              className={`${
                stepIndex === 2 ? 'grid grid-cols-2 gap-x-4 gap-y-3' : 'space-y-3'
              }`}
            >
              {STEPS[stepIndex].options.map((option) => {
                const isChecked =
                  selections[3] instanceof Set && selections[3].has(option.name);

                return (
                  <label
                    key={option.name}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type={STEPS[stepIndex].type}
                      name={`step-${stepIndex}`}
                      checked={isChecked}
                      onChange={() =>
                        stepIndex === 3
                          ? handleCheckboxToggle(option.name)
                          : handleRadioSelect(stepIndex, option.name)
                      }
                      className="w-4 h-4"
                      data-has-listeners="true"
                    />
                    <span className="text-sm">
                      {option.name} ({option.price.toLocaleString()}원)
                    </span>
                  </label>
                );
              })}
            </div>

          </div>



          <div className="mt-10 text-center">
            <p className="mb-1 text-gray-600 leading-relaxed">
              <span className="bg-blue-100 text-blue-800 px-1.5 rounded">
                {(selections[0] as string) || '0000'}
              </span>{' '}
              브랜드의{' '}
              <span className="bg-blue-100 text-blue-800 px-1.5 rounded">
                {(selections[1] as string) || '000'}
              </span>{' '}
              타입{' '}
              <span className="bg-blue-100 text-blue-800 px-1.5 rounded">
                {(selections[2] as string) || '0000'}
              </span>{' '}
              연식의 에어컨의
              <br />
              <span className="bg-blue-100 text-blue-800 px-1.5 rounded">
                {selections[3] instanceof Set && selections[3].size > 0
                  ? Array.from(selections[3]).join(' / ')
                  : '00000'}
              </span>{' '}
              수리비용은{' '}
              <AnimatedPrice value={total} />
               입니다.
            </p>
          </div>

          {selections[3] instanceof Set && selections[3].size > 0 && (
            <div className="mt-6 text-center">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                수리기사의 콜백을 받으시겠어요?
              </button>
            </div>
          )}

        </ComponentCard>
       </div>
    </div>
  );
}
