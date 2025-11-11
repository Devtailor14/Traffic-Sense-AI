import React from 'react';
import Card from '../components/Card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';
import { useTheme } from '../App';

type ModelEntry = {
  name: string;
  params: number;
  flops: number;
  precision: number;
  recall: number;
  mAP50: number;
  mAP50_95: number;
  boxLoss: number;
  clsLoss: number;
  dflLoss: number;
};

const toPct = (x?: number) =>
  typeof x === 'number' ? `${(x * 100).toFixed(1)}%` : '—';

const ModelsPage: React.FC = () => {
  const { theme } = useTheme();

  /** Model Data **/
  const models: ModelEntry[] = [
    {
      name: 'YOLOv8-N (Baseline)',
      params: 3.01,
      flops: 4.1,
      precision: 0.8689,
      recall: 0.8315,
      mAP50: 0.909,
      mAP50_95: 0.768,
      boxLoss: 0.7102,
      clsLoss: 0.3961,
      dflLoss: 0.9712,
    },
    {
      name: 'YOLOv8-FDIDH + DWR',
      params: 13.57,
      flops: 12.5,
      precision: 0.9056,
      recall: 0.8319,
      mAP50: 0.9003,
      mAP50_95: 0.7603,
      boxLoss: 0.7387,
      clsLoss: 0.3992,
      dflLoss: 0.9294,
    },
    {
      name: 'YOLOv8-FDIDH + DySample',
      params: 21.19,
      flops: 15.0,
      precision: 0.8676,
      recall: 0.831,
      mAP50: 0.898,
      mAP50_95: 0.7207,
      boxLoss: 0.8996,
      clsLoss: 0.5169,
      dflLoss: 0.9969,
    },
    {
      name: 'YOLOv8-FDD',
      params: 16.56,
      flops: 40.02,
      precision: 0.8433,
      recall: 0.7919,
      mAP50: 0.8717,
      mAP50_95: 0.6797,
      boxLoss: 1.0281,
      clsLoss: 0.6629,
      dflLoss: 1.0904,
    },
    {
      name: 'YOLOv8-FDE (Proposed)',
      params: 2.69,
      flops: 3.5,
      precision: 0.9077,
      recall: 0.8806,
      mAP50: 0.9242,
      mAP50_95: 0.8159,
      boxLoss: 0.6083,
      clsLoss: 0.3239,
      dflLoss: 0.8771,
    },
  ];

  /** Module Info **/
  const moduleDetails = [
    {
      title: 'C3K2 Block',
      summary:
        'Compact residual unit using smaller kernels for lower compute without compromising receptive field.',
      diagram: '/images/c3k2_diagram.png',
      detail: `C3K2 modifies the classic C3/C2f structure with lighter convolution layers and smaller kernels, enabling efficient multi-scale representation while cutting parameters.`,
    },
    {
      title: 'FDIDH (Feature Dynamic Interaction Detection Head)',
      summary:
        'Enhances classification–regression interaction with dynamic feature fusion and deformable convolutions.',
      diagram: '/images/fdidh_diagram.png',
      detail: `FDIDH explicitly links classification and regression:
• Residual 3×3 convs for pre-interaction features.
• Regression branch with Deformable Convolutions for adaptive boundary sampling.
• Classification branch uses dynamic filters for boundary-aware focus.
• Layer Attention preserves independence while improving shared understanding.`,
    },
    {
      title: 'DySample (Dynamic Sampling Upsampling)',
      summary:
        'Adaptive upsampling that learns positional biases for fine-grained object reconstruction.',
      diagram: '/images/dysample_diagram.png',
      detail: `DySample learns offset fields and positional biases:
• Replaces nearest-neighbor upsampling with learned dynamic sampling.
• Grouped channel processing for efficiency.
• Improves detail recovery for small or occluded objects.`,
    },
    {
      title: 'DWR (Dilation-Wise Residual)',
      summary:
        'Parallel dilated conv branches expand receptive field efficiently at neck layers (P4/P5).',
      diagram: '/images/dwr_diagram.png',
      detail: `DWR introduces multi-dilation branches:
• Local capture with 3×3 Conv→BN→ReLU.
• Semantic expansion with depthwise dilations (2×, 4×, 8×).
• Receptive field boost without parameter inflation.`,
    },
    {
      title: 'Post-SPPF Attention',
      summary:
        'Light attention post-SPPF for motion and shape amplification under varied lighting.',
      diagram: '/images/post_sppf_attention.png',
      detail: `Analyzes pooled SPPF outputs to reweight channels/spatial regions for clearer motion & shape cues under complex lighting.`,
    },
  ];

  const themeColors = {
    light: {
      text: '#374151',
      grid: '#e5e7eb',
      tooltipBg: 'rgba(255,255,255,0.9)',
      tooltipBorder: '#d1d5db',
    },
    dark: {
      text: '#d1d5db',
      grid: '#374151',
      tooltipBg: 'rgba(31,41,55,0.9)',
      tooltipBorder: '#4b5563',
    },
  };
  const currentThemeColors =
    theme === 'dark' ? themeColors.dark : themeColors.light;

  const perfChartData = models.map((m) => ({
    name: m.name,
    mAP50: m.mAP50,
    mAP50_95: m.mAP50_95,
    precision: m.precision,
    recall: m.recall,
  }));

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-center">
        YOLO Models Comparison & Analysis
      </h1>

      {/* PDF DOWNLOAD */}
      <div className="flex justify-end">
        <a
          href="/papers/YOLO_FDE.pdf"
          download
          className="inline-block bg-primary-600 text-white px-4 py-2 rounded-md shadow hover:bg-primary-700"
        >
          Download Paper (PDF)
        </a>
      </div>

      {/* PERFORMANCE CHART */}
      <Card>
        <h2 className="text-2xl font-bold mb-4 text-center">
          Performance Metrics (percent)
        </h2>
        <ResponsiveContainer width="100%" height={420}>
          <BarChart
            data={perfChartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={currentThemeColors.grid}
            />
            <XAxis
              dataKey="name"
              tick={{ fill: currentThemeColors.text, fontSize: 12 }}
              interval={0}
            />
            <YAxis tick={{ fill: currentThemeColors.text }} />
            <Tooltip
              formatter={(value: any, name: string) =>
                [`${(Number(value) * 100).toFixed(2)}%`, name]
              }
              contentStyle={{
                backgroundColor: currentThemeColors.tooltipBg,
                borderColor: currentThemeColors.tooltipBorder,
                color: currentThemeColors.text,
              }}
              cursor={{ fill: 'rgba(128,128,128,0.08)' }}
            />
            <Legend />
            <Bar dataKey="mAP50" name="mAP@50" fill="#3b82f6" />
            <Bar dataKey="mAP50_95" name="mAP@50-95" fill="#60a5fa" />
            <Bar dataKey="precision" name="Precision" fill="#82ca9d" />
            <Bar dataKey="recall" name="Recall" fill="#fbbf24" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* TABLE I */}
      <Card>
        <h2 className="text-2xl font-bold mb-4 text-center">
          Table I — Model Performance Comparison (UA-DETRAC Subset)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="uppercase text-xs bg-slate-50 dark:bg-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-4 py-2">Model</th>
                <th className="px-4 py-2 text-center">Parameters (M)</th>
                <th className="px-4 py-2 text-center">GFLOPs</th>
                <th className="px-4 py-2 text-center">Precision</th>
                <th className="px-4 py-2 text-center">Recall</th>
                <th className="px-4 py-2 text-center">mAP@50</th>
                <th className="px-4 py-2 text-center">mAP@50–95</th>
              </tr>
            </thead>
            <tbody>
              {models.map((m, i) => (
                <tr
                  key={m.name}
                  className={`border-b ${
                    i % 2 === 0
                      ? 'bg-white dark:bg-dark-card'
                      : 'bg-slate-100 dark:bg-dark-border'
                  } ${
                    m.name.includes('FDE')
                      ? 'font-semibold text-green-600 dark:text-green-400'
                      : ''
                  }`}
                >
                  <td className="px-4 py-2">{m.name}</td>
                  <td className="px-4 py-2 text-center">{m.params}</td>
                  <td className="px-4 py-2 text-center">{m.flops}</td>
                  <td className="px-4 py-2 text-center">{toPct(m.precision)}</td>
                  <td className="px-4 py-2 text-center">{toPct(m.recall)}</td>
                  <td className="px-4 py-2 text-center">{toPct(m.mAP50)}</td>
                  <td className="px-4 py-2 text-center">{toPct(m.mAP50_95)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* TABLE II */}
      <Card>
        <h2 className="text-2xl font-bold mb-4 text-center">
          Table II — Model Loss Comparison at Convergence
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="uppercase text-xs bg-slate-50 dark:bg-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-4 py-2">Model</th>
                <th className="px-4 py-2 text-center">Box Loss</th>
                <th className="px-4 py-2 text-center">Cls Loss</th>
                <th className="px-4 py-2 text-center">DFL Loss</th>
              </tr>
            </thead>
            <tbody>
              {models.map((m, i) => (
                <tr
                  key={`${m.name}-loss`}
                  className={`border-b ${
                    i % 2 === 0
                      ? 'bg-white dark:bg-dark-card'
                      : 'bg-slate-100 dark:bg-dark-border'
                  } ${
                    m.name.includes('FDE')
                      ? 'font-semibold text-green-600 dark:text-green-400'
                      : ''
                  }`}
                >
                  <td className="px-4 py-2">{m.name}</td>
                  <td className="px-4 py-2 text-center">
                    {m.boxLoss.toFixed(4)}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {m.clsLoss.toFixed(4)}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {m.dflLoss.toFixed(4)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* CORE MODULES */}
      <Card>
        <h2 className="text-3xl font-bold mb-6 text-center">Core Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {moduleDetails.map((mod, idx) => (
            <motion.div
              key={mod.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-2xl overflow-hidden border dark:border-gray-700 shadow-lg bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-5 flex flex-col"
            >
              <h3 className="text-xl font-semibold text-primary-600 dark:text-green-400">
                {mod.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 leading-snug">
                {mod.summary}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-3 whitespace-pre-line leading-relaxed">
                {mod.detail}
              </p>
              <div className="mt-4 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-inner">
                <img
                  src={mod.diagram}
                  alt={`${mod.title} diagram`}
                  onError={(e) =>
                    ((e.target as HTMLImageElement).src =
                      '/images/placeholder_module.png')
                  }
                  className="w-full object-contain rounded-xl transition-transform duration-500 hover:scale-[1.05]"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1 italic">
                  Figure: {mod.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* ARCHITECTURE VISUALIZATION */}
      <Card>
        <h2 className="text-2xl font-bold mb-4 text-center">
          YOLOv8-FDE Architecture
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="flex justify-center">
            <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-inner">
              <img
                src="/images/yolov8_fde_architecture.png"
                alt="YOLOv8-FDE Architecture"
                onError={(e) =>
                  ((e.target as HTMLImageElement).src =
                    '/images/placeholder_arch.png')
                }
                className="rounded-lg shadow-lg w-full object-contain transition-transform duration-500 hover:scale-[1.03]"
              />
              <p className="text-center text-sm mt-2 text-gray-600 dark:text-gray-400 italic">
                Figure: YOLOv8-FDE overall network architecture.
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-3"
          >
            <p>
              The <strong>YOLOv8-FDE (Feature Dynamic Enhanced)</strong>{' '}
              architecture builds upon YOLOv8 with specialized modules designed
              to improve robustness in complex traffic conditions. It replaces
              heavy C2f blocks with lightweight <strong>C3K2</strong> units,
              integrates <strong>DWR</strong> modules for expanded receptive
              fields, and applies a <strong>Post-SPPF Attention</strong> layer
              for refined spatial understanding.
            </p>
            <p>
              The <strong>FDIDH</strong> introduces explicit feature interaction
              between classification and regression heads using{' '}
              <strong>Deformable Convolutions</strong> and dynamic filtering,
              improving precision on occluded or small vehicles. Meanwhile,{' '}
              <strong>DySample</strong> adaptively enhances upsampling, allowing
              the model to focus on difficult boundary regions and complex
              lighting.
            </p>
            <p>
              Together, these innovations make YOLOv8-FDE more efficient,
              accurate, and resilient in real-world road environments, achieving
              higher mAP with fewer parameters.
            </p>
          </motion.div>
        </div>
      </Card>

      {/* CONCLUSION */}
      <Card>
        <h2 className="text-2xl font-bold mb-4 text-center">Conclusion</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          The proposed <strong>YOLOv8-FDE</strong> achieves state-of-the-art
          trade-offs on the UA-DETRAC subset: achieving{' '}
          <strong>
            {toPct(models.find((m) => m.name.includes('FDE'))?.mAP50)}
          </strong>{' '}
          mAP@50 and{' '}
          <strong>
            {toPct(models.find((m) => m.name.includes('FDE'))?.mAP50_95)}
          </strong>{' '}
          mAP@50–95, with only{' '}
          <strong>
            {models.find((m) => m.name.includes('FDE'))?.params}M
          </strong>{' '}
          parameters and{' '}
          <strong>
            {models.find((m) => m.name.includes('FDE'))?.flops} GFLOPs
          </strong>
          . The combination of FDIDH, DySample, DWR, and attention mechanisms
          enables accurate detection in dense, complex traffic scenes while
          maintaining high efficiency.
        </p>
      </Card>
    </div>
  );
};

export default ModelsPage;
