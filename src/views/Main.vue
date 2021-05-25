<template>
  <div class="Main">
    <div class="div-header">
      <h1>Covid-19 Dashboard</h1>
    </div>
    <div class="div-buttons" />
    <div class="div-body">
      <div class="div-datepicker">
        <v-date-picker
          v-model="range"
          is-range
        >
          <template v-slot="{ inputValue, inputEvents }">
            <div class="flex justify-center items-center">
              <input
                :value="inputValue.start"
                v-on="inputEvents.start"
                class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300"
              >
              ~
              <input
                :value="inputValue.end"
                v-on="inputEvents.end"
                class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300"
              >
            </div>
          </template>
        </v-date-picker>
        <b-button
          type="is-primary"
          class="btn-search"
          @click="onClickBtn"
        >
          Search
        </b-button>
      </div>
      <div class="div-chart">
        <wj-flex-chart
          :initialized="initChart"
          :items-source="data"
          binding-x="createDt"
          selection-mode="Point"
          binding-x-type="DATE"
          date-format="yyyy-MM-dd"
          chart-type="Line"
          :palette="palette"
        />
        <div class="div-checkbox">
          <b-field>
            <b-checkbox
              v-model="isDecideCnt"
              @input="onClickCheckbox"
            >
              확진자 수
            </b-checkbox>
          </b-field>
          <b-field>
            <b-checkbox
              v-model="isClearCnt"
              @input="onClickCheckbox"
            >
              격리해제 수
            </b-checkbox>
          </b-field>
          <b-field>
            <b-checkbox
              v-model="isExamCnt"
              @input="onClickCheckbox"
            >
              검사진행 수
            </b-checkbox>
          </b-field>
          <b-field>
            <b-checkbox
              v-model="isDeathCnt"
              @input="onClickCheckbox"
            >
              사망자 수
            </b-checkbox>
          </b-field>
          <b-field>
            <b-checkbox
              v-model="isCareCnt"
              @input="onClickCheckbox"
            >
              치료중 환자 수
            </b-checkbox>
          </b-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./Main.js" />
<style src="./Main.scss" lang="scss" />