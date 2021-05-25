import axios from 'axios'
import dayjs from 'dayjs'
import * as wjcChart from '@grapecity/wijmo.chart'
// import * as wjCore from '@grapecity/wijmo'

export default {
  name: 'Main',
  props: {
    palette: {
      type: Array,
      default () {
        return [
          'rgba(32, 208, 191, .5)',
          'rgba(47, 141, 250, .8)',
          'rgba(26, 168, 121, .8)',
          'rgba(21, 83, 182, .8)',
          // 'rgba(227, 65, 96, .8)',
          // 'rgba(248, 199, 83, .8)',
          // 'rgba(236, 126, 48, .8)',
          'rgba(189, 65, 227, .8)'
        ]
      }
    }
  },
  methods: {
    initChart (chart) {
      this.mainChart = chart

      this.mainChart.axisX.labelAngle = 0
      this.mainChart.legend.position = 'Bottom'

      this.mainChart.beginUpdate()
      let series_decideCnt = new wjcChart.Series()
      series_decideCnt.name = '확진자 수'
      series_decideCnt.binding = 'decideCnt'
      series_decideCnt.chartType = 'Area'
      this.mainChart.series.push(series_decideCnt)

      let series_clearCnt = new wjcChart.Series()
      series_clearCnt.name = '격리해제 수'
      series_clearCnt.binding = 'clearCnt'
      this.mainChart.series.push(series_clearCnt)

      let series_examCnt = new wjcChart.Series()
      series_examCnt.name = '검사진행 수'
      series_examCnt.binding = 'examCnt'
      this.mainChart.series.push(series_examCnt)

      let series_deathCnt = new wjcChart.Series()
      series_deathCnt.name = '사망자 수'
      series_deathCnt.binding = 'deathCnt'
      series_deathCnt.chartType = 'Bar'
      this.mainChart.series.push(series_deathCnt)

      let series_careCnt = new wjcChart.Series()
      series_careCnt.name = '치료중 환자 수'
      series_careCnt.binding = 'careCnt'
      this.mainChart.series.push(series_careCnt)

      this.mainChart.endUpdate()
    },
    onClickBtn () {
      // console.log(dayjs(this.range.start).format('YYYYMMDD'), dayjs(this.range.end).format('YYYYMMDD'))
      this.startCreateDt = dayjs(this.range.start).format('YYYYMMDD')
      this.endCreateDt = dayjs(this.range.end).format('YYYYMMDD')
      this.searchProcess()
    },
    async searchProcess () {
      const url =
        "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson"
      const ServiceKey =
        "pazBdlMEQ8jBn1ovS4UfBWEMzypVRd5jPd887GygCIAQWJYJWbzAcAn3w5jaYyPN3lwpX69kUb6dl3rbeMgAww%3D%3D"

      let pageNo = "1";
      let numOfRows = "10";

      try {
        let response = await axios.get(
          url +
          "?ServiceKey=" +
          ServiceKey +
          "&pageNo=" +
          pageNo +
          "&numOfRows=" +
          numOfRows +
          "&startCreateDt=" +
          this.startCreateDt +
          "&endCreateDt=" +
          this.endCreateDt,
        )
        this.data = response.data.response.body.items.item

        // 날짜 순으로 정렬
        this.data.sort((a, b) => {
          return a.createDt < b.createDt ? -1 : a.createDt > b.createDt ? 1 : 0
        })

        this.data.map(data => {
          data.createDt = dayjs(data.createDt).format('YYYY-MM-DD')
        })

        return response.data === null ? [] : response.data
      } catch (error) {
        console.log(error)
      }

    },
    onClickCheckbox () {
      this.mainChart.series[0].visibility = this.isDecideCnt === true ? 0 : 3
      this.mainChart.series[1].visibility = this.isClearCnt === true ? 0 : 3
      this.mainChart.series[2].visibility = this.isExamCnt === true ? 0 : 3
      this.mainChart.series[3].visibility = this.isDeathCnt === true ? 0 : 3
      this.mainChart.series[4].visibility = this.isCareCnt === true ? 0 : 3
    }
  },
  data () {
    return {
      data: [],
      range: {
        start: new Date().getTime() - (7 * 24 * 60 * 60 * 1000), // 7일 전
        end: new Date(),
      },
      startCreateDt: null,
      endCreateDt: null,
      isDecideCnt: true,
      isClearCnt: true,
      isExamCnt: true,
      isDeathCnt: true,
      isCareCnt: true
    }
  }
}