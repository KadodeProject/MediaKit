// コア
import KadodeLogoAnimation from "@🗃/Animation/KadodeLogoAnimation.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
// メソッド
import {
  getDailyChange,
  getDailyT,
} from "@💿/OperationCoreTransition/GetDailyChange.ts";
import { CreateOperationCoreChartDataToD3nodata } from "@💿/OperationCoreTransition/CreateOperationCoreChartDataToD3nodata.ts";
//型
import { LineChartT } from "@🧩/d3nodata.ts";
// みため
import Layout from "@🌟/BasicLayout.tsx";
import UserChangeCard from "@🗃/Card/UserChangeCard.tsx";
import ProductIntroCard from "@🗃/Card/ProductIntroCard.tsx";
import ExternalServiceIntroCard from "@🗃/Card/ExternalServiceIntroCard.tsx";
import D3nodataLineChart from "@🏝/D3nodataLineChart.tsx";

type forIndexData = {
  daily: getDailyT;
  monthlyChart: LineChartT[];
};

export const handler: Handlers<forIndexData> = {
  async GET(_req, ctx) {
    const dailyData = await getDailyChange<getDailyT>();
    const diaryStatisticMonthlyData =
      await CreateOperationCoreChartDataToD3nodata<LineChartT[]>();
    return ctx.render({
      daily: dailyData,
      diaryStatisticMonthlyData: diaryStatisticMonthlyData,
    });
  },
};

export default function Home({ data }: PageProps<forIndexData>) {
  const total = data.daily.total;
  const last1Day = data.daily.last1Day;
  return (
    <Layout title="top">
      <div class="p-4 mx-auto max-w-screen-md">
        <h1 class="bg-kn_white text-3xl text-center ">かどでプロジェクト</h1>
        <KadodeLogoAnimation />
        <p class="bg-kn_white text-center text-2xl my-2">
          かどでプロジェクトの中心, かどでポータルへようこそ.
        </p>
        <div class="flex flex-col rounded-2xl p-4 mx-2 mt-12 border-2 border-dotted border-kn_l_purple bg-kn_white">
          <h2 class="text-3xl mx-2 text-center ">現在のかどで日記</h2>
          <p class="text-center mx-2 my-2 ">※かっこ内は過去24時間の変化</p>
          <div class="flex justify-around items-center flex-wrap p-4">
            <UserChangeCard
              title="ユーザー数の変化"
              total={total.user_total}
              change={last1Day.user_change}
              unit="人"
            />
            <UserChangeCard
              title="日記数の変化"
              total={total.diary_total}
              change={last1Day.diary_change}
              unit="日記"
            />
            <UserChangeCard
              title="統計数の変化"
              total={total.statistic_per_date_total}
              change={last1Day.statistic_per_date_change}
              unit="個"
            />
          </div>
        </div>
        <div class="graphSection">
          <h2 class="m-4 text-3xl text-center">利用状況の推移</h2>
          <D3nodataLineChart chartData={data.diaryStatisticMonthlyData} />
        </div>
        <h2 class="m-4 text-3xl text-center mb-8">こんなことやってます！</h2>
        <ProductIntroCard
          title="かどで日記"
          url="https://kado.day"
          urlTitle="kado.day"
          description="主力の日記サービス！"
          img_url="img/productImage/diary/diary1.jpg"
        />
        <ProductIntroCard
          title="かどでポータル"
          url="https://portal.kado.day"
          urlTitle="portal.kado.day"
          description="かどでプロジェクトのポータルサイト！"
          img_url="img/productImage/portal/portal1.jpg"
        />
        <ProductIntroCard
          title="かどで日記開発者向けwiki"
          url="https://wiki.kado.day"
          urlTitle="wiki.kado.day"
          description="かどで日記の開発時に見るwiki！"
          img_url="img/productImage/wiki/wiki1.jpg"
        />
        {/* <ProductIntroCard
          title="かどでペーパー"
          url="https://paper.kado.day/img/screenshot.jpg"
          urlTitle="paper.kado.day"
          description="かどで日記の情報を電子ペーパーで表示する！"
          img_url="img/productImage/paper/paper1.jpg"
        /> */}
        <h2 class="m-4 text-3xl text-center mb-8 mt-24">よければこちらも</h2>
        <div class="flex justify-center flex-wrap">
          <ExternalServiceIntroCard
            title="かどでプロジェクト公式note"
            url="https://note.com/kadoday"
            img_url="img/logo/note/logo_symbol.png"
          />
          <ExternalServiceIntroCard
            title="かどでプロジェクトGitHub"
            url="https://github.com/KadodeProject"
            img_url="img/logo/github/GitHub-Mark-120px-plus.png"
          />
        </div>
      </div>
    </Layout>
  );
}
