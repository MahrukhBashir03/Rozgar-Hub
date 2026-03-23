import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const content = {
  en: {
    dir: 'ltr',
    title: 'Post a Job',
    subtitle: 'Find skilled workers in minutes',
    success: '✓ Job posted successfully! Workers will start applying soon.',
    errorRequired: 'Please fill in all required fields',
    namePlaceholder: 'Imran Malik',
    nameLabel: 'Your Name *',
    phoneLabel: 'Phone Number *',
    phonePlaceholder: '03XX XXXXXXX',
    jobTypeLabel: 'Job Type *',
    jobTypePlaceholder: 'Select job type',
    durationLabel: 'Duration *',
    durationPlaceholder: 'Select duration',
    descriptionLabel: 'Job Description *',
    descriptionPlaceholder: 'Describe what work needs to be done...',
    budgetLabel: 'Budget (Rs.) *',
    cityLabel: 'City *',
    cityPlaceholder: 'Select city',
    locationLabel: 'Exact Location/Address *',
    locationPlaceholder: 'House #, Street, Area',
    submitBtn: 'Post Job & Find Workers',
    loadingBtn: 'Posting Job...',
    loginText: 'Already have an account?',
    loginLink: 'Login here',
    jobTypes: [
      'Electrical Work', 'Plumbing', 'Carpentry', 'Painting', 'AC Repair',
      'House Cleaning', 'Cooking', 'Driving', 'Gardening', 'Tailoring',
      'Construction', 'Welding', 'Other',
    ],
    durations: [
      '1 Hour', '2-4 Hours', 'Half Day', 'Full Day', '2-3 Days', '1 Week', 'Ongoing',
    ],
    cities: [
      'Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad',
      'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala', 'Other',
    ],
  },
  ur: {
    dir: 'rtl',
    title: 'نوکری پوسٹ کریں',
    subtitle: 'چند منٹوں میں ہنر مند کارکن تلاش کریں',
    success: '✓ نوکری کامیابی سے پوسٹ ہو گئی! کارکن جلد درخواست دینا شروع کر دیں گے۔',
    errorRequired: 'براہ کرم تمام ضروری خانے پُر کریں',
    nameLabel: 'آپ کا نام *',
    namePlaceholder: 'عمران ملک',
    phoneLabel: 'فون نمبر *',
    phonePlaceholder: '03XX XXXXXXX',
    jobTypeLabel: 'کام کی قسم *',
    jobTypePlaceholder: 'کام کی قسم منتخب کریں',
    durationLabel: 'مدت *',
    durationPlaceholder: 'مدت منتخب کریں',
    descriptionLabel: 'کام کی تفصیل *',
    descriptionPlaceholder: 'کیا کام کرنا ہے اس کی تفصیل لکھیں...',
    budgetLabel: 'بجٹ (روپے) *',
    cityLabel: 'شہر *',
    cityPlaceholder: 'شہر منتخب کریں',
    locationLabel: 'مکمل پتہ *',
    locationPlaceholder: 'مکان نمبر، گلی، علاقہ',
    submitBtn: 'نوکری پوسٹ کریں اور کارکن تلاش کریں',
    loadingBtn: 'پوسٹ ہو رہا ہے...',
    loginText: 'پہلے سے اکاؤنٹ ہے؟',
    loginLink: 'یہاں لاگ ان کریں',
    jobTypes: [
      'بجلی کا کام', 'پلمبنگ', 'بڑھئی کا کام', 'پینٹنگ', 'AC مرمت',
      'گھر کی صفائی', 'کھانا پکانا', 'ڈرائیونگ', 'باغبانی', 'درزی کا کام',
      'تعمیراتی کام', 'ویلڈنگ', 'دیگر',
    ],
    durations: [
      '1 گھنٹہ', '2-4 گھنٹے', 'آدھا دن', 'پورا دن', '2-3 دن', '1 ہفتہ', 'جاری',
    ],
    cities: [
      'لاہور', 'کراچی', 'اسلام آباد', 'راولپنڈی', 'فیصل آباد',
      'ملتان', 'پشاور', 'کوئٹہ', 'سیالکوٹ', 'گوجرانوالہ', 'دیگر',
    ],
  },
};

const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: '2' };

const EmployerJobModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [lang, setLang] = useState('en');
  const t = content[lang];

  const [formData, setFormData] = useState({
    name: '', phone: '', jobType: '', description: '',
    budget: '', location: '', city: '', duration: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const requiredFields = ['name', 'phone', 'jobType', 'description', 'budget', 'location', 'city', 'duration'];
    const emptyField = requiredFields.find(field => !formData[field]);

    if (emptyField) {
      setError(t.errorRequired);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({ name: '', phone: '', jobType: '', description: '', budget: '', location: '', city: '', duration: '' });
      }, 2000);
    }, 1500);
  };

  if (!isOpen) return null;

  const labelStyle = lang === 'ur' ? urduFont : {};

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div
        dir={t.dir}
        className="glass-card w-full max-w-lg p-6 lg:p-8 animate-scale-in relative max-h-[90vh] overflow-y-auto custom-scrollbar"
      >
        {/* Close Button — always top-right visually */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Language Toggle */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-muted border border-border rounded-xl p-1 gap-1">
            <button
              onClick={() => setLang('en')}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                lang === 'en'
                  ? 'bg-secondary text-white shadow-md'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLang('ur')}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                lang === 'ur'
                  ? 'bg-secondary text-white shadow-md'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              style={urduFont}
            >
              اردو
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-full bg-secondary/20 mb-4">
            <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2" style={labelStyle}>{t.title}</h2>
          <p className="text-muted-foreground" style={labelStyle}>{t.subtitle}</p>
        </div>

        {/* Success */}
        {success && (
          <div className="mb-6 p-4 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-center" style={labelStyle}>
            {t.success}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-destructive/20 border border-destructive/30 text-destructive text-center" style={labelStyle}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="empName" style={labelStyle}>{t.nameLabel}</Label>
              <Input
                id="empName"
                placeholder={t.namePlaceholder}
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="bg-muted border-border focus:border-secondary"
                style={labelStyle}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="empPhone" style={labelStyle}>{t.phoneLabel}</Label>
              <Input
                id="empPhone"
                type="tel"
                placeholder={t.phonePlaceholder}
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="bg-muted border-border focus:border-secondary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label style={labelStyle}>{t.jobTypeLabel}</Label>
              <Select value={formData.jobType} onValueChange={(value) => handleChange('jobType', value)}>
                <SelectTrigger className="bg-muted border-border" style={labelStyle}>
                  <SelectValue placeholder={t.jobTypePlaceholder} />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {t.jobTypes.map((type, i) => (
                    <SelectItem key={i} value={type} style={labelStyle}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label style={labelStyle}>{t.durationLabel}</Label>
              <Select value={formData.duration} onValueChange={(value) => handleChange('duration', value)}>
                <SelectTrigger className="bg-muted border-border" style={labelStyle}>
                  <SelectValue placeholder={t.durationPlaceholder} />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {t.durations.map((dur, i) => (
                    <SelectItem key={i} value={dur} style={labelStyle}>{dur}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" style={labelStyle}>{t.descriptionLabel}</Label>
            <Textarea
              id="description"
              placeholder={t.descriptionPlaceholder}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="bg-muted border-border focus:border-secondary min-h-[100px]"
              style={labelStyle}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget" style={labelStyle}>{t.budgetLabel}</Label>
              <Input
                id="budget"
                type="number"
                placeholder="2000"
                value={formData.budget}
                onChange={(e) => handleChange('budget', e.target.value)}
                className="bg-muted border-border focus:border-secondary"
              />
            </div>
            <div className="space-y-2">
              <Label style={labelStyle}>{t.cityLabel}</Label>
              <Select value={formData.city} onValueChange={(value) => handleChange('city', value)}>
                <SelectTrigger className="bg-muted border-border" style={labelStyle}>
                  <SelectValue placeholder={t.cityPlaceholder} />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {t.cities.map((city, i) => (
                    <SelectItem key={i} value={city} style={labelStyle}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" style={labelStyle}>{t.locationLabel}</Label>
            <Input
              id="location"
              placeholder={t.locationPlaceholder}
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="bg-muted border-border focus:border-secondary"
              style={labelStyle}
            />
          </div>

          <div className="pt-4">
            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span style={labelStyle}>{t.loadingBtn}</span>
                </>
              ) : (
                <span style={labelStyle}>{t.submitBtn}</span>
              )}
            </Button>
          </div>
        </form>

        {/* Login Link */}
        <p className="text-center mt-6 text-sm text-muted-foreground" style={labelStyle}>
          {t.loginText}{' '}
          <button onClick={onSwitchToLogin} className="text-secondary hover:underline font-medium" style={labelStyle}>
            {t.loginLink}
          </button>
        </p>
      </div>
    </div>
  );
};

export default EmployerJobModal;