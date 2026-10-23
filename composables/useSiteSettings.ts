import { ref, onMounted } from 'vue';
import { siteSettingsApi } from '@/api_factory/modules/siteSettings';

export interface SiteSettingsData {
  stats: {
    enabled: boolean;
    title: string;
    metrics: Array<{ value: string; label: string }>;
  };
  sections: {
    stats: boolean;
    articles: boolean;
    testimonials: boolean;
    mentorship: boolean;
    career: boolean;
    events: boolean;
    pricing: boolean;
    cvUploadMandatory: boolean;
  };
}

export const useSiteSettings = (platform: 'universe' | 'interntional' = 'universe') => {
  const settings = ref<SiteSettingsData>({
    stats: {
      enabled: false,
      title: 'Platform Impact & Student Community',
      metrics: [
        { value: '5k+', label: 'Verified Students' },
        { value: '10k+', label: 'Study Resources' },
        { value: '150+', label: 'Senior Mentors' },
        { value: '50+', label: 'Partner Labs' },
      ],
    },
    sections: {
      stats: false,
      articles: true,
      testimonials: true,
      mentorship: true,
      career: true,
      events: true,
      pricing: true,
      cvUploadMandatory: false,
    },
  });

  const loading = ref(true);

  const fetchSettings = async () => {
    try {
      const res = await siteSettingsApi.getSettings(platform);
      const data = res.data || res;
      if (data) {
        settings.value = {
          stats: {
            enabled: data.stats?.enabled ?? false,
            title: data.stats?.title ?? settings.value.stats.title,
            metrics:
              data.stats?.metrics && data.stats.metrics.length > 0
                ? data.stats.metrics
                : settings.value.stats.metrics,
          },
          sections: {
            stats: data.sections?.stats ?? data.stats?.enabled ?? false,
            articles: data.sections?.articles ?? true,
            testimonials: data.sections?.testimonials ?? true,
            mentorship: data.sections?.mentorship ?? true,
            career: data.sections?.career ?? true,
            events: data.sections?.events ?? true,
            pricing: data.sections?.pricing ?? true,
            cvUploadMandatory: data.sections?.cvUploadMandatory ?? false,
          },
        };
      }
    } catch (e) {
      // Keep sensible default configuration
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchSettings();
  });

  return {
    settings,
    loading,
    fetchSettings,
  };
};
