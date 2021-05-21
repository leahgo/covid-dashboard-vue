import axios from 'axios'
import dayjs from 'dayjs'
import * as wjcChart from '@grapecity/wijmo.chart'
// import * as wjCore from '@grapecity/wijmo'

export default {
  name: 'Main',
  props: {
    // palette: {
    //   type: Array,
    //   default () {
    //     return [
    //       'rgba(227, 65, 96, .8)',
    //       'rgba(32, 208, 191, .8)',
    //       'rgba(47, 141, 250, .8)',
    //       'rgba(248, 199, 83, .8)',
    //       'rgba(236, 126, 48, .8)',
    //       'rgba(26, 168, 121, .8)',
    //       'rgba(21, 83, 182, .8)',
    //       'rgba(189, 65, 227, .8)',
    //       'rgba(204, 145, 124, .8)',
    //       'rgba(81, 109, 136, .8)'
    //     ]
    //   }
    // }
  },
  async mounted () {

    const url =
      "/openapi/service/rest/Covid19/getCovid19InfStateJson"
    const ServiceKey =
      "pazBdlMEQ8jBn1ovS4UfBWEMzypVRd5jPd887GygCIAQWJYJWbzAcAn3w5jaYyPN3lwpX69kUb6dl3rbeMgAww%3D%3D"

    let startDt = '20210101'
    let endDt = '20210521'
    let pageNo = "1";
    let numOfRows = "10";
    let startCreateDt = dayjs(startDt).format("YYYYMMDD");
    let endCreateDt = dayjs(endDt).format("YYYYMMDD");

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
        startCreateDt +
        "&endCreateDt=" +
        endCreateDt,
      )
      this.data = response.data.response.body.items.item

      // 날짜 순으로 정렬
      this.data.sort((a, b) => {
        return a.createDt < b.createDt ? -1 : a.createDt > b.createDt ? 1 : 0
      })

      return response.data === null ? [] : response.data
    } catch (error) {
      console.log(error)
    }

  },
  methods: {
    initChart (chart) {
      this.mainChart = chart

      this.mainChart.beginUpdate()
      let series_decideCnt = new wjcChart.Series()
      series_decideCnt.name = '확진자 수'
      series_decideCnt.binding = 'decideCnt'
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
      this.mainChart.series.push(series_deathCnt)

      let series_careCnt = new wjcChart.Series()
      series_careCnt.name = '치료중 환자 수'
      series_careCnt.binding = 'examCnt'
      this.mainChart.series.push(series_careCnt)

      this.mainChart.endUpdate()
    }
  },
  data () {
    return {
      data: []
    }
  }
}